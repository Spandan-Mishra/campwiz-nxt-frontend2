import { Link } from 'react-router-dom'
import LogoSvg from '@/public/logo.svg'
import ReturnButton from "../ReturnButton"
import { LogoutButtton } from "./Buttons"
// import SettingButton from "../user/SettingButton"
type HeaderProps = {
    returnTo?: string
}
// if (typeof window !== 'undefined') {
//     (window as typeof window & { Sentry?: typeof Sentry }).Sentry = Sentry;
// }
const Header = ({ returnTo }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between w-full h-auto px-4 text-center">
            <ReturnButton hiddenIn={['^\/$', '^\/user\/login$']} to={returnTo} />
            <Link to='/' style={{ margin: 'auto', display: 'inline-block' }}>
                <img src={LogoSvg} alt="Logo of CampWiz" height={75} style={{ margin: 'auto' }} fetchPriority='high' />
            </Link>

            {/* <SettingButton /> */}
            <LogoutButtton hiddenIn={['^\/$', '^\/user\/login$']} />

        </header>
    )
}
export default Header