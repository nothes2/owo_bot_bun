import {
    InteractionCallbackResponse,
} from "discord.js";




export async function handle_option(response: InteractionCallbackResponse, command_name: string) {

    if(!(response && response.resource && response.resource.message)) {
        return
    }

    const value = await response.resource.message.awaitMessageComponent({time: 60_000})

    if(!value.isStringSelectMenu()) {
        return
    }

    options_action(value.values[0])
}

function options_action(value: string) {
    switch (value) {
        case 'command': edit_command(); break
    }
}

function edit_command() {
//     embed: CustomEmbed, command_name: string
}