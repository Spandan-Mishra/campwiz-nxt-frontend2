import { MenuItem, TextField } from "@mui/material";
type ProjectInputProps = {
    value: string
    onChange: (projectId: string) => void
    disabled?: boolean
    sx?: { [key: string]: unknown },
    loading?: boolean
}
const ProjectInput = ({ value, onChange, disabled = false, sx = {}, loading = false }: ProjectInputProps) => {
    return (
        <TextField
            label="Project"
            variant="outlined"
            sx={{ ...sx, mb: 2, width: '100%' }}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            disabled={loading || disabled}
            select
        >
            <MenuItem value="commons">Commons</MenuItem>

        </TextField>
    );
}
export default ProjectInput;