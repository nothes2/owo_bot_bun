import { setGlobalVariable } from "@core/global_variables"

export const init_data = (interaction: any) => {
    const calcMode = new Map()
    const calcMessage: Map<any, any> = new Map()

    calcMessage.set(interaction.user.id, [])
    calcMessage.set(process.env.CLIENT_ID, [])
    calcMode.set(interaction.user.id, true)
    calcMode.set(process.env.CLIENT_ID, true)
    setGlobalVariable("calc_mode", calcMode)
    setGlobalVariable("calc_message", calcMessage)
}