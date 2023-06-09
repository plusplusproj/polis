// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

/** @jsx jsx */

import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Heading, Box, Text, jsx } from "theme-ui"
import toast from "react-hot-toast"

import { handleZidMetadataUpdate } from "../../actions"
import NoPermission from "./no-permission"
import { CheckboxField } from "./CheckboxField"
import SeedComment from "./seed-comment"

import Url from "../../util/url"
import ComponentHelpers from "../../util/component-helpers"
import { RootState } from "../../util/types"

class ConversationConfig extends React.Component<
  {
    dispatch: Function
    zid_metadata: {
      conversation_id: string
      topic: string // actually: title
      description: string // actually: intro text
      survey_caption: string
      postsurvey: string
      postsurvey_limit: string
      postsurvey_submissions: string
      postsurvey_redirect: string
    }
    error: string
    loading: boolean
  },
  {}
> {
  topic: HTMLInputElement
  description: HTMLTextAreaElement
  survey_caption: HTMLTextAreaElement
  postsurvey: HTMLTextAreaElement
  postsurvey_limit: HTMLInputElement
  postsurvey_submissions: HTMLInputElement
  postsurvey_redirect: HTMLInputElement

  handleStringValueChange(field) {
    return () => {
      let val = this[field].value
      if (field === "help_bgcolor" || field === "help_color") {
        if (!val.length) {
          val = "default"
        }
      }
      this.props.dispatch(handleZidMetadataUpdate(this.props.zid_metadata, field, val))
    }
  }

  handleIntegerValueChange(field) {
    return () => {
      if (this[field].value === "") {
        this.props.dispatch(handleZidMetadataUpdate(this.props.zid_metadata, field, 0))
      } else {
        const val = parseInt(this[field].value, 10)
        if (isNaN(val) || val.toString() !== this[field].value) {
          toast.error("Invalid value")
          return
        }
        this.props.dispatch(handleZidMetadataUpdate(this.props.zid_metadata, field, val))
      }
    }
  }

  render() {
    if (ComponentHelpers.shouldShowPermissionsError(this.props)) {
      return <NoPermission />
    }

    return (
      <Box>
        <Heading
          as="h3"
          sx={{
            fontSize: [3, null, 4],
            lineHeight: "body",
            mb: [3, null, 4],
          }}
        >
          Configure
        </Heading>
        <Box sx={{ mb: [4] }}>
          {this.props.loading ? (
            <Text>Saving...</Text>
          ) : (
            <Text>⚡ Changes automatically saved</Text>
          )}
          {this.props.error ? <Text>Error Saving</Text> : null}
        </Box>

        <CheckboxField field="is_active" label="Conversation is open">
          Uncheck to disable voting and commenting
        </CheckboxField>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>Title</Text>
          <input
            ref={(c) => (this.topic = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              borderRadius: 2,
              padding: [2],
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            onBlur={this.handleStringValueChange("topic").bind(this)}
            defaultValue={this.props.zid_metadata.topic}
          />
        </Box>

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          Before the Survey
        </Heading>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Intro Page Text
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>
              Shown before starting
            </Text>
          </Text>
          <textarea
            ref={(c) => (this.description = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              height: "7em",
              resize: "none",
              padding: [2],
              borderRadius: 2,
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            data-test-id="description"
            onBlur={this.handleStringValueChange("description").bind(this)}
            defaultValue={this.props.zid_metadata.description}
          />
        </Box>

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          During the Survey
        </Heading>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Caption
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>Shown during voting</Text>
          </Text>
          <textarea
            placeholder="Please review the statements below and add your own:"
            ref={(c) => (this.survey_caption = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              height: "7em",
              resize: "none",
              padding: [2],
              borderRadius: 2,
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            data-test-id="survey_caption"
            onBlur={this.handleStringValueChange("survey_caption").bind(this)}
            defaultValue={this.props.zid_metadata.survey_caption}
          />
        </Box>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Votes Expected
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>
              Optional. Number of votes users should submit
            </Text>
          </Text>
          <input
            ref={(c) => (this.postsurvey_limit = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              borderRadius: 2,
              padding: [2],
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            onBlur={this.handleIntegerValueChange("postsurvey_limit").bind(this)}
            defaultValue={this.props.zid_metadata.postsurvey_limit || ""}
          />
        </Box>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Statements Expected
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>
              Optional. Number of statements users should submit
            </Text>
          </Text>
          <input
            ref={(c) => (this.postsurvey_submissions = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              borderRadius: 2,
              padding: [2],
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            onBlur={this.handleIntegerValueChange("postsurvey_submissions").bind(this)}
            defaultValue={this.props.zid_metadata.postsurvey_submissions || ""}
          />
        </Box>

        <Box>
          Once both requirements are met, participants will be redirected to the post-survey page.
        </Box>

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          After the Survey
        </Heading>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Post-Survey Text
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>Optional</Text>
          </Text>
          <textarea
            placeholder="You’re all done! Thanks for contributing your input. You can expect to hear back from us after..."
            ref={(c) => (this.postsurvey = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              height: "7em",
              resize: "none",
              padding: [2],
              borderRadius: 2,
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            data-test-id="postsurvey"
            onBlur={this.handleStringValueChange("postsurvey").bind(this)}
            defaultValue={this.props.zid_metadata.postsurvey}
          />
        </Box>

        <Box sx={{ mb: [3] }}>
          <Text sx={{ mb: [2] }}>
            Post-Survey Link
            <Text sx={{ display: "inline", color: "lightGray", ml: [2] }}>
              Optional. Shown as a button after the survey
            </Text>
          </Text>
          <input
            placeholder="https://"
            ref={(c) => (this.postsurvey_redirect = c)}
            sx={{
              fontFamily: "body",
              fontSize: [2],
              width: "100%",
              maxWidth: "35em",
              borderRadius: 2,
              padding: [2],
              border: "1px solid",
              borderColor: "mediumGray",
            }}
            onBlur={this.handleStringValueChange("postsurvey_redirect").bind(this)}
            defaultValue={this.props.zid_metadata.postsurvey_redirect || ""}
          />
        </Box>

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          Customize the user interface
        </Heading>

        <CheckboxField field="write_type" label="Enable comments" isIntegerBool>
          Participants can write their own cards (Recommended: ON)
        </CheckboxField>

        <CheckboxField field="auth_needed_to_write" label="Email required to comment">
          Email registration required to write cards (Recommended: OFF)
        </CheckboxField>

        <CheckboxField field="strict_moderation" label="Moderator approval for comments">
          Require moderators to approve submitted comments, before voters can see them
        </CheckboxField>

        <CheckboxField field="help_type" label="Show help text" isIntegerBool>
          Show verbose instructions when writing comments
        </CheckboxField>

        <CheckboxField field="importance_enabled" label="Importance Enabled">
          [Experimental] Show the "This comment is important" checkbox on the embed interface (only
          embeds!)
        </CheckboxField>

        {/*
        <CheckboxField
          field="subscribe_type"
          label="Prompt participants to subscribe to updates"
          isIntegerBool
        >
          Prompt participants after they have finished voting to provide their email address, to receive notifications when there are new comments to vote on.
        </CheckboxField>

        <CheckboxField field="auth_opt_fb" label="Facebook login prompt">
          Show Facebook login prompt
        </CheckboxField>

        <CheckboxField field="auth_opt_tw" label="Twitter login prompt">
          Show Twitter login prompt
        </CheckboxField>

        <CheckboxField field="auth_needed_to_vote" label="Require Auth to Vote">
          Participants cannot vote without first connecting either Facebook or Twitter
        </CheckboxField>
         */}

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          Embed
        </Heading>
        <Box>
          <Text>Copy this HTML into your page to embed this survey.</Text>
          <Box
            sx={{ my: [2], px: [3], py: [1], border: "1px solid lightGray", borderRadius: "6px" }}
          >
            <pre>
              {"<div"}
              {" class='polis'"}
              {" data-conversation_id='" + this.props.zid_metadata.conversation_id + "'>"}
              {"</div>\n"}
              {"<script async src='" + Url.urlPrefix + "embed.js'></script>"}
            </pre>
          </Box>
        </Box>

        <Heading as="h3" sx={{ mt: 5, mb: 4 }}>
          Add seed comments
        </Heading>

        <SeedComment
          params={{ conversation_id: this.props.zid_metadata.conversation_id }}
          dispatch={this.props.dispatch}
        />

        <Box sx={{ mt: [4] }}>
          <Link sx={{ variant: "styles.a" }} to={"/c/" + this.props.zid_metadata.conversation_id}>
            Go to survey
          </Link>
        </Box>
      </Box>
    )
  }
}

export default connect((state: RootState) => state.user)(
  connect((state: RootState) => state.zid_metadata)(ConversationConfig)
)
