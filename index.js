console.clear();
console.log('[INFO]: Loading...');
//auto-meme bot coded by legend >:D
const { Client } = require('discord.js');
const Discord = require('discord.js');
const { token, channelID } = require('./config.json');
const got = require('got');
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
	disableMentions: 'everyone'
});
const subReddits = [
	'meme',
	'me_irl',
	'dankmeme',
	'AdviceAnimals',
	'dankmemes',
	'MemeEconomy',
	'ComedyCemetery',
	'memes',
	'PrequelMemes',
	'terriblefacebookmemes',
	'funny',
	'teenagers'
];
const random = subReddits[Math.floor(Math.random() * subReddits.length)];

console.log('-------------------------------------');
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`);
console.log('-------------------------------------');
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	client.user.setActivity('auto-meme by legend :D', {
		type: 'WATCHING'
	});
	setInterval(() => {
		let channel = client.channels.cache.get(channelID);
		if (!channel) return console.log('[ERROR]: Channel Not Found');
		const embed = new Discord.MessageEmbed();
		got(`https://www.reddit.com/r/${random}/random/.json`).then(response => {
			let content = JSON.parse(response.body);
			let permalink = content[0].data.children[0].data.permalink;
			let memeUrl = `https://reddit.com${permalink}`;
			let memeImage = content[0].data.children[0].data.url;
			let memeTitle = content[0].data.children[0].data.title;
			let memeUpvotes = content[0].data.children[0].data.ups;
			let memeDownvotes = content[0].data.children[0].data.downs;
			let memeNumComments = content[0].data.children[0].data.num_comments;
			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setImage(memeImage);
			embed.setColor('#ffc256');
			embed.setFooter(
				`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
			);
			channel.send({ embed: embed });
		});
	}, 60000);
});

client.login(token).catch(err => {
	console.log('[ERROR]: Invalid Token Provided');
});
