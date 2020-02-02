export class ConfigDB {
    static data = {
        settings: {
            layout_type: 'ltr',
            sidebar: { wrapper: 'default', bodyWrapper: 'default' },
            sidebar_setting: 'iconcolor-sidebar',
            sidebar_backround: 'dark-sidebar',
        },
        color: {
            layout_version: 'light',
            theme_color: 'style',
            primary_color: '#4466f2',
            secondary_color: '#1ea6ec',
            mix_layout: 'default',
        },
        router_animation: 'fadeIn',
        session:{
            minute:15
        }
    };
}

export default ConfigDB;
