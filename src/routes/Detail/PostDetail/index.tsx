import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

import { RiNotionFill } from "react-icons/ri"

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  return (
    <StyledWrapper>
      {data.type[0] === "Post" && <PostHeader data={data} />}
      <WRARTI>
        <a href={`https://oein.notion.site/${data.id.replace(/-/g, "")}`}>
          <NotionBTN>
            <RiNotionFill />
            View in Notion
          </NotionBTN>
        </a>
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </WRARTI>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`

const NotionBTN = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 50px;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray12};
  background-color: ${({ theme }) => theme.colors.gray5};
  cursor: pointer;
  display: flex;
  gap: 0.25rem;
  align-items: center;
`

const WRARTI = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
`
