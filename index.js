// @author PoofyPloop 

const { TOKEN } = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const prefix = "/";

// Gateway control
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, ], });

// discord message event
client.on("messageCreate", function(message) { 
    //checks if author is a bot and checks for prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // formats command for input
    const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
    
    // help command
    if (command === "earlhelp") {
        message.reply("1. /movieinfo [name] [year]: Grabs information about a movie of choice, year can be a blank. \n2. /seriesinfo [name] [year]: Grabs information about a tv show of choice, year can be a blank. \n3. /top5shows [genre] [year] [plot]: Lists top 5 tv shows based on genre, year and plot can be a blank. \n4. /top5movies [genre] [year] [plot]: Lists top 5 movies based on genre, year and plot can be a blank.")
    }

    // command that returns information about a movie of choice
    else if (command === "movieinfo") {
        let movie;
        async function Movie(title) {
            try {
                movie = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_8185bk4t/?title=${title}&count=5&title_type=feature`, {
                    params:
                    {
                        year: args[1] ?? null,
                    }
                        
                });
                console.log(movie.data);
                message.reply(`${movie.data?.results[0].title} ${movie.data?.results[0].description} \nRating: ${movie.data?.results[0].imDbRating} \nPlot: ${movie.data?.results[0].plot} \n${movie.data?.results[0].image}`);
            } catch (error) {
                console.error(error);
            }
        }
        console.log(Movie(args[0]));
    }

    // command that returns information about a series of choice
    else if (command === "seriesinfo") {
        let movie;
        async function Movie(title) {
            try {
                movie = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_8185bk4t/?title=${title}&count=5&title_type=tv_series`, {
                    params:
                    {
                        year: args[1] ?? null,
                    }
                        
                });
                console.log(movie.data);
                message.reply(`${movie.data?.results[0].title} ${movie.data?.results[0].description} \nRating: ${movie.data?.results[0].imDbRating} \nPlot: ${movie.data?.results[0].plot} \n${movie.data?.results[0].image}`);
            } catch (error) {
                console.error(error);
            }
        }
        console.log(Movie(args[0]));
    }

    // command that returns the top 5 shows with based on genre, year, and or plot
    else if (command === "top5shows") {
        let movie;
        async function Movie(genre) {
            try {
                movie = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_8185bk4t/?genres=${genre}&count=5&title_type=tv_series&sort=user_rating,desc&num_votes=5000,100000`, {
                    params:
                    {
                        year: args[1] ?? null,
                        plot: args[2] ?? null,
                    }
                        
                });
                console.log(movie.data);
                movie.data.results.forEach((x, index) => {
                    if (index > 5) return;
                    message.reply(`${x.title} ${x.description} \nRating: ${x.imDbRating} \nPlot: ${x.plot} \n${x.image}`);
                })
            } catch (error) {
                console.error(error);
            }
        }
        console.log(Movie(args[0]));
    }

    // command that returns the top 5 movies with based on genre, year, and or plot
    else if (command === "top5movies") {
        let movie;
        async function Movie(genre) {
            try {
                movie = await axios.get(`https://imdb-api.com/API/AdvancedSearch/k_8185bk4t/?genres=${genre}&count=5&title_type=feature&sort=user_rating,desc&num_votes=5000,100000`, {
                    params:
                    {
                        year: args[1] ?? null,
                        plot: args[2] ?? null,
                    }
                        
                });
                console.log(movie.data);
                movie.data.results.forEach((x, index) => {
                    if (index > 5) return;
                    message.reply(`${x.title} ${x.description} \nRating: ${x.imDbRating} \nPlot: ${x.plot} \n${x.image}`);
                })
            } catch (error) {
                console.error(error);
            }
        }
        console.log(Movie(args[0]));
    }
    
}); 

client.login(TOKEN);