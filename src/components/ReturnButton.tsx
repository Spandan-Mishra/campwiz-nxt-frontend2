import Button, { type ButtonProps } from "@mui/material/Button";
import LeftArrowIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButtton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "@root/i18n/client";
import type { TFunction } from "i18next";
type ReturnButtonProps = {
    disabled?: boolean
    sx?: ButtonProps['sx'],
    hiddenIn?: string[],
    alwaysBig?: boolean,
    to?: string
}
const B = ({ onClick, isSmall, alwaysBig, sx, disabled, t }: { onClick?: () => void, isSmall: boolean, alwaysBig: boolean, sx?: ButtonProps['sx'], disabled?: boolean, t: TFunction }) => (
    !isSmall || alwaysBig ? (
        <Button
            onClick={onClick}
            variant="text"
            color="primary"
            startIcon={<LeftArrowIcon />}
            sx={sx}
            disabled={disabled}
        >
            {!isSmall && t('return')}
        </Button>
    ) : (
        <IconButtton
            disabled={disabled}
            sx={{ m: 0.5, cursor: 'pointer', display: 'inline-block', ...(sx || {}), zIndex: 20 }}
            onClick={onClick}
            color="primary"
            className="absolute left-4 z-20 m-1"
        >
            <LeftArrowIcon />
        </IconButtton>
    )
)
const ReturnButton = ({ disabled, sx, hiddenIn, alwaysBig = false, to }: ReturnButtonProps) => {
    const pathName = useLocation().pathname;
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { t } = useTranslation()
    if (hiddenIn) {
        for (const path of hiddenIn) {
            const r = new RegExp(path)
            if (r.test(pathName)) {
                return null
            }
        }
    }
    const onClick = () => {
        if (typeof window !== 'undefined') {
            if (to)
                window.location.replace(to)
            else
                window.history.back()
        }
    }
    return to ? <Link to={to}>
        <B isSmall={isSmall} alwaysBig={alwaysBig} sx={sx} disabled={disabled} t={t} />
    </Link> : <B onClick={onClick} isSmall={isSmall} alwaysBig={alwaysBig} sx={sx} disabled={disabled} t={t} />
}
export default ReturnButton