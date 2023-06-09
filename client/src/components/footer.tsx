/** @jsx jsx */
import React from "react"
import { Link } from "react-router-dom"
import { Box, Heading, Text, jsx } from "theme-ui"

const Footer: React.FC<{ inSurvey: boolean }> = ({ inSurvey }) => {
  return (
    <Box
      sx={{
        textAlign: inSurvey ? "center" : "",
        fontFamily: "monospace",
        px: [4],
      }}
    >
      {!inSurvey && <Text as="span">(c) {new Date().getFullYear()} Authors</Text>}
      <Link sx={{ variant: "styles.a", ml: 3 }} to="/tos">
        Terms
      </Link>{" "}
      <Link sx={{ variant: "styles.a", ml: 3, pr: "1px" }} to="/privacy">
        Privacy
      </Link>
      {inSurvey && (
        <Link sx={{ variant: "styles.a", ml: 3 }} to="/">
          About
        </Link>
      )}
      {!inSurvey && (
        <Link sx={{ variant: "styles.a", ml: 3 }} to="/about">
          About
        </Link>
      )}
    </Box>
  )
}

export default Footer
