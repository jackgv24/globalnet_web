import { Home, File, Headphones, User, Users, Code } from 'react-feather';
import {COLABORADOR_ADD,COLABORADOR_SHOW_ALL,COLABORADOR_SHOW_BY_ID} from './url'

export const MENUITEMS = [
    {
        title: 'Dashboard',
        icon: Home,
        type: 'sub',
        badgeType: 'primary',
        active: true,
        children: [
            { path: '/dashboard/default', title: 'Default', type: 'link' },
            { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link' },
            { path: '/dashboard/university', title: 'University', type: 'link' },
            { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
            { path: '/dashboard/project', title: 'Project', type: 'link' },
        ],
    },
    {
        title: 'Support Ticket',
        icon: Headphones,
        type: 'link',
        path: '/support-ticket/supportTicket',
        active: false,
    },
    {
        path: '/sample/samplepage',
        title: 'Sample Page',
        icon: File,
        type: 'link',
        active: false,
    },
    {
        title: 'Colaborador',
        icon: User,
        type: 'sub',
        badgeType: 'primary',
        active: true,
        children: [
            { path: COLABORADOR_ADD, title: 'Agregar', type: 'link' },
            { path: COLABORADOR_SHOW_ALL, title: 'Mostrar', type: 'link' },
        ],
    },
    {
        title: 'Cargos',
        icon: Users,
        type: 'sub',
        badgeType: 'primary',
        active: true,
        children: [
            { path: '/cargos/agregar', title: 'Agregar', type: 'link' },
            { path: '/cargos', title: 'Mostrar', type: 'link' },
        ],
    },
    {
        path: '/labs',
        title: 'Lab Component',
        icon: Code,
        type: 'link',
        active: false,
    },
];
