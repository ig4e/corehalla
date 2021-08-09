import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './SideNav.module.scss'

import { useFavorites } from '~providers/FavoritesProvider'

import { FavoriteIcon, HomeIcon, RankingsIcon, SettingsIcon } from '@Icons'

interface BottomNavigationTab {
    title: string
    link: string
    icon: JSX.Element
    exact?: boolean
}

const tabs: BottomNavigationTab[] = [
    {
        title: 'Home',
        link: '/',
        icon: HomeIcon,
        exact: true,
    },
    {
        title: 'Rankings',
        link: '/rankings',
        icon: RankingsIcon,
    },
    {
        title: 'Favorites',
        link: '/favorites',
        icon: FavoriteIcon,
    },
    {
        title: 'Settings',
        link: '/settings',
        icon: SettingsIcon,
    },
]

export function SideNav(): JSX.Element {
    const { favorites } = useFavorites()
    const { pathname, query } = useRouter()

    if (typeof document === 'undefined') return null

    return (
        <div className={styles.sidenav}>
            <div className={styles.content}>
                {tabs.map(({ link, icon, exact }, i) => (
                    <Link href={link} key={i}>
                        <a
                            className={`${styles.navItem} ${
                                pathname === link || (!exact && pathname.startsWith(link)) ? styles.active : ''
                            }`}
                        >
                            {icon}
                        </a>
                    </Link>
                ))}
                <hr className={styles.separator} />
                {favorites.map(({ favorite_id, type, label, thumb_uri }) => (
                    <Link href={`/stats/${type}/${favorite_id}`} key={`${type}/${favorite_id}`}>
                        <a
                            className={`${styles.navItem} ${
                                pathname.startsWith(`/stats/${type}`) && query.id === favorite_id ? styles.active : ''
                            }`}
                        >
                            <img src={thumb_uri} alt={label} />
                            <span>{label.substr(0, 3).toUpperCase()}</span>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}
