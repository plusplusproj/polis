import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { Box, Heading, Button, Text, Input } from "theme-ui"

import api from "../../util/api"
import type { Comment } from "../../util/types"
import { DropdownMenu } from "../../components/dropdown"
import { TbCheck, TbEdit, TbX } from "react-icons/tb"

type SurveyCardProps = {
  comment: Comment
  conversationId: string
  onVoted: Function
  hasVoted: boolean
  stacked: boolean
}

const SurveyCard = ({ comment, conversationId, onVoted, hasVoted, stacked }: SurveyCardProps) => {
  const { tid: commentId, txt, created, pid } = comment

  const [voting, setVoting] = useState(false)
  const [editingVote, setEditingVote] = useState(false)

  // returns promise {nextComment: {tid:...}} or {} if no further comments
  const agree = (
    commentId: string,
    event: MouseEvent,
    starred: boolean = undefined,
    weight = 0,
    f
  ) => {
    ;(event.currentTarget as any).blur()
    setVoting(true)
    api
      .post("api/v3/votes", {
        pid: "mypid",
        conversation_id: conversationId,
        agid: 1,
        weight,
        vote: -1,
        tid: commentId,
        // starred: boolean
      })
      .then(() => {
        onVoted(commentId)
        setEditingVote(false)
      })
      .always(() => setVoting(false))
  }
  const disagree = (
    commentId: string,
    event: MouseEvent,
    starred: boolean = undefined,
    weight = 0
  ) => {
    ;(event.currentTarget as any).blur()
    setVoting(true)
    api
      .post("api/v3/votes", {
        pid: "mypid",
        conversation_id: conversationId,
        agid: 1,
        weight,
        vote: 1,
        tid: commentId,
        // starred: boolean
      })
      .then(() => {
        onVoted(commentId)
        setEditingVote(false)
      })
      .always(() => setVoting(false))
  }
  const skip = (commentId: string, event: MouseEvent, starred: boolean = undefined, weight = 0) => {
    ;(event.currentTarget as any).blur()
    setVoting(true)
    api
      .post("api/v3/votes", {
        pid: "mypid",
        conversation_id: conversationId,
        agid: 1,
        weight,
        vote: 0,
        tid: commentId,
        // starred: boolean
      })
      .then(() => {
        onVoted(commentId)
        setEditingVote(false)
      })
      .always(() => setVoting(false))
  }

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid",
        borderColor: "lighterGray",
        borderRadius: "8px",
        bg: "background",
        boxShadow: "1px 1px 4px rgba(0,0,0,0.04)",
        width: "100%",
        height: "180px",
        px: "40px",
        py: "36px",
        // mb: [3, null, 4],
        mb: stacked ? "-177px" : undefined,
        overflow: "scroll",
      }}
    >
      <Text sx={{ mb: 4, wordBreak: "break-word" }}>{txt}</Text>
      {hasVoted && (
        <Box sx={{ position: "absolute", top: [3], right: [3] }}>
          <DropdownMenu
            rightAlign
            options={
              editingVote
                ? [
                    { name: "Agree", onClick: agree.bind(null, commentId) },
                    { name: "Disagree", onClick: disagree.bind(null, commentId) },
                    { name: "Skip", onClick: skip.bind(null, commentId) },
                    {
                      name: "Cancel",
                      onClick: () => setEditingVote(false),
                    },
                  ]
                : [{ name: "Edit your vote", onClick: () => setEditingVote(true) }]
            }
          />
        </Box>
      )}
    </Box>
  )
}

export default SurveyCard