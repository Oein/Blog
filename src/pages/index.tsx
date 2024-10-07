import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import styled from "@emotion/styled"

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <BGX
        css={{
          background:
            "linear-gradient( rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) ), url(https://r2.e-z.host/a13b6f5c-3520-41a2-ba6d-5911d7d2674b/x4vs0hlr.jpeg)",
          height: "16rem",
          backgroundSize: "cover",
          backgroundPosition: "top",
          position: "absolute",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "3rem",
          maxHeight: "calc(16rem - 2px)",
          overflow: "hidden",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        <h1>Oein's Story</h1>
        <div
          css={{
            color: "rgba(230, 230, 230, 0.8)",
            fontSize: "1rem",
            fontWeight: 400,
          }}
        >
          {CONFIG.profile.bio}
        </div>
      </BGX>
      <div css={{ height: "16rem" }} />
      <Feed />
    </>
  )
}

const BGX = styled.div`
  color: ${({ theme }) =>
    theme.scheme == "dark" ? "white" : theme.colors.gray2};
`

export default FeedPage
