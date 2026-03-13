"use client";
import { Button, IconButton, useMediaQuery } from "@mui/material"
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import logout from "./logout";
// import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@root/i18n/client";

export const DhashboardButton = ({ projectId, canAccessOtherProject }: { projectId: string | null, canAccessOtherProject: boolean }) => {
    const { t } = useTranslation()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const url = canAccessOtherProject ? `/project/` : `/project/${projectId}`;
    const sx = {
        bgcolor: "#006699", // Blue background color
        color: "#fff", // White text color
        borderRadius: 30,
        transition: "0.3s",
        m: 1,
        "&:hover": {
            bgcolor: "#00557d", // Darker blue background on hover
            transform: "scale(1.05)",
        },
    }
    return (
        <Link to={url}>
            {isSmall ? <IconButton
                sx={sx}
            >
                <DashboardIcon />
            </IconButton> : <Button
                variant="contained"
                startIcon={<DashboardIcon />}
                sx={sx}
            >
                {isSmall ? null : t('home.dashboard')}
            </Button>
            }
        </Link>
    )
}

export const LogoutButtton = ({ hiddenIn, refresh = false }: { hiddenIn?: string[], refresh?: boolean }) => {
    const { t } = useTranslation()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const pathName = useLocation().pathname;
    const sx = {
        borderRadius: 30,
        m: 1,
    }
    const [loggingOut, setLoggingOut] = useState(false);
    const perFormLogout = async () => {
        setLoggingOut(true);
        await logout(refresh);
        setLoggingOut(false);
        console.log('Logged out', refresh);
    }
    if (hiddenIn) {
        for (const path of hiddenIn) {
            const r = new RegExp(path)
            if (r.test(pathName)) {
                return null
            }
        }
    }
    return (
        isSmall ? <IconButton
            sx={sx}
            onClick={perFormLogout}
            disabled={loggingOut}
            color="error"
            loading={loggingOut}
        >
            <PowerSettingsNewIcon />
        </IconButton> : <Button
            variant="contained"
            startIcon={<PowerSettingsNewIcon />}
            onClick={perFormLogout}
            disabled={loggingOut}
            loading={loggingOut}
            color="error"
            sx={sx}
        >
            {!isSmall && t('home.logout')}
        </Button>

    )
}