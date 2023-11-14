import { themesMap } from '$lib/themes';
import { version } from './../../package.json';

export async function load({cookies}) {

    const theme = cookies.get('theme');
    if (theme){
        if (theme in themesMap){
            return {
                theme: theme,
                version: version,
            }
        } else {
            cookies.set('theme', 'ocean');
            return {
                theme: 'ocean',
                version: version,
            }
        }
    } else {
        cookies.set('theme', 'ocean');
        return {
            theme: 'ocean',
            version: version,
        }
    }
}