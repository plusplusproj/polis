/** @jsx jsx */
import React from "react"
import { Box, jsx } from "theme-ui"

class Logomark extends React.Component<{ style: React.CSSProperties }> {
  render() {
    return <img src="/bubbles.png" width="43" style={this.props.style} />
  }
}

export default Logomark
