import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { center } from "./Common";

const CenteredBox = styled(Box)(() => ({
    ...center
}))
export { CenteredBox }