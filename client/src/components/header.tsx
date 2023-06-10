/** @jsx jsx */
import React, { Component } from "react"
import { Flex, Box, jsx } from "theme-ui"

import { Link } from "react-router-dom"
import Logomark from "./logomark"

const Header: React.FC<{ user?; inSurvey? }> = ({ user, inSurvey }) => {
  return (
    <Flex
      sx={{
        margin: `0 auto`,
        width: "100%",
        pt: [3, 5],
        pb: [3, 5],
        px: [4],
        mb: [5, 0],
        fontFamily: "monospace",
        borderBottom: ["1px solid lightGray", "none"],
        justifyContent: inSurvey ? "center" : "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "-1px",
        }}
      >
        <Logomark style={{ position: "relative", top: 6 }} fill={"#62a6ef"} />
        {!inSurvey && (
          <Link sx={{ variant: "links.nav", ml: "10px" }} to={user ? "/conversations" : "/"}>
            Polis
          </Link>
        )}
      </Box>
      {!inSurvey && (
        <Box sx={{ mt: [1] }}>
          {user ? (
            <React.Fragment>
              <Link sx={{ variant: "links.nav", ml: [4] }} to={`/account`}>
                Account
              </Link>
              <Link sx={{ variant: "links.nav", ml: [4] }} to="/signout">
                Sign out
              </Link>
            </React.Fragment>
          ) : (
            <Link sx={{ variant: "links.nav" }} to="/signin">
              Sign in
            </Link>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default Header
