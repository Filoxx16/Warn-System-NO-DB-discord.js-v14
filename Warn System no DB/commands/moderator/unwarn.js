const  { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const EditReply = require("../../Systems/EditReply");

module.exports = {
    name: "unwarn",
    description: "sistema warn ",
    category: "Moderazione",
    UserPerms: ["ManageRoles"],
    BotPerms: ["ManageRoles"],
    options: [
        {
           name: "target",
           description: "scegli target",
           type: 6,
           required: true,
        },
        {
            name: "motivazione",
            description: "scrivi motivazione",
            type: 3,
            required: true
        }

    ],
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true})
        
        const { options, guild, roles, user} = interaction

        const Utente = options.getMember("target")
        const Motivazione = options.getString("motivazione")
        const ruolo_warn1 = "1021146943994482770"
        const ruolo_warn2 = "1021458883065155674"
        const ruolo_warn3 = "1021464353138028654"
        const CanaleLog = client.channels.cache.get("1021450512018706472")

        if(Utente == user.id) return EditReply (interaction, "❌", "Non puoi toglierti da solo il warn")
        if(!Utente.roles.cache.has(ruolo_warn3)) {
            if(!Utente.roles.cache.has(ruolo_warn2)) {
                if(!Utente.roles.cache.has(ruolo_warn1)){
                    return EditReply(interaction, "⚠", "L'utente non ha warn")
                }
            }
        }
        if (!Utente.roles.cache.has(ruolo_warn3)) {
            if(!Utente.roles.cache.has(ruolo_warn2)) {
                if(Utente.roles.cache.has(ruolo_warn1))
                await Utente.roles.remove(ruolo_warn1)
                EditReply(interaction, "✅", `Warn 1 rimossso con successo a ${Utente}`)
                CanaleLog.send({
                    embeds: [
                    new EmbedBuilder()
                        .setColor("Green")
                        .setTitle("Nuovo warn rimosso")
                        .setDescription(`
                        Staffer name: <@${user.id}>

                        Target name: ${Utente}

                        Motivazione : \`${Motivazione}\`

                        Numero warn: \`1\`
                        `)
                        .setFooter({text: '💻 Filoxx#1208'})  
                        .setTimestamp()
                    ]
                })
            } 
        }
        if(Utente.roles.cache.has(ruolo_warn3)) {
            await Utente.roles.remove(ruolo_warn3)
            EditReply(interaction, "✅", `Warn 3 rimosso con successo a ${Utente}`)
            CanaleLog.send({
                embeds: [
                new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("Nuovo warn rimosso")
                    .setDescription(`
                    Staffer name: <@${user.id}>

                    Target name: ${Utente}

                    Motivazione : \`${Motivazione}\`

                    Numero warn: \`2\`
                    `)
                    .setFooter({text: '💻 Filoxx#1208'})  
                    .setTimestamp()
                ]
            })
        } else {
            if(!Utente.roles.cache.has(ruolo_warn3)) {
                if(Utente.roles.cache.has(ruolo_warn2)) {
                    await Utente.roles.remove(ruolo_warn2)
                    EditReply(interaction, "✅", `Warn 2 rimosso con successo a ${Utente}`)
                    CanaleLog.send({
                        embeds: [
                        new EmbedBuilder()
                            .setColor("Green")
                            .setTitle("Nuovo warn rimosso")
                            .setDescription(`
                            Staffer name: <@${user.id}>
    
                            Target name: ${Utente}
    
                            Motivazione : \`${Motivazione}\`
    
                            Numero warn: \`1\`
                            `)
                            .setFooter({text: '💻 Filoxx#1208'})  
                            .setTimestamp()
                        ]
                    })
                } return 
            }   
            
        }
    }
}