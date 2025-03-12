import fs from "fs";
import path from "path";
import type {Feature} from "@core/type/type_general.ts";

const dir_features = path.join(__dirname, '../../features')

export const file_detector = async () => {

    const directories = fs.readdirSync(dir_features)
    const feature_path_array = Array.from(feature_path(directories))
    const feature_file_array = Array.from(feature_file(feature_path_array))

    const url_set: Set<string> = new Set()

    for (let i = 0; i < feature_path_array.length; i++) {
        url_set.add(`${feature_path_array[i]}\\${feature_file_array[i]}`)
    }

    return url_set
}

export const feature_path = (directories: string[]): Set<string> => {

    const path_set: Set<string> = new Set();

    for(const directory of directories) {
        const feature: string = path.join(dir_features, `${directory}/presentation`)
        path_set.add(feature)
    }
    return path_set
}

export const feature_file = (feature_path: string[]): Set<string> => {
    const feature_set: Set<string> = new Set()

    for (const feature of feature_path) {
        const files = fs.readdirSync(feature)

        feature_set.add(entry_file(files))
    }
    return feature_set
}

export const entry_file = (files: string[]) => {
    for (const file of files) {
        if(file.endsWith(".ts")) {
            return file
        }
    }

    console.warn("No entry file detected!");
    return ''
}

export const feature_loop = (features: Feature[], g_commands: Feature[]) => {

    features.forEach((feature: Feature) => {
        g_commands.push(feature)
    })
}