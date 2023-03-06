const { Events } = require('discord.js');
const config = require("../config.json");

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		try {
			const member = message.member;
			if (!member) {
				return;
			}
			const hasSlowmodeRole = member.roles.cache.some((role) => {
				return role.name.toLowerCase() === config.slowmodeRole.toLowerCase();
			});
			if (hasSlowmodeRole) {
				const mutedRole = member.guild.roles.cache.find(role =>
					role.name.toLowerCase() === config.mutedRole.toLowerCase()
				);
				if (mutedRole) {
					await member.roles.add(mutedRole);
					setTimeout(() => {
						member.roles.remove(mutedRole);
					}, config.slowmodeSeconds * 1000);
				}
			}
		}
		catch (error) {
			console.error(error);
		}
	}
};