import Widget from './widget.js'
import Source from './source.js'
import Files from './files.js'
import Terminal from './terminal.js'
import Directory from './directory.js'
import Report from './report.js'
import Social from './social.js'
import Visualizer from './visualizer.js'
import MintNft from './mint-nft.js'
import News from './news.js'
import Page from './page.js'
import UserInterface, { Pane, PaneRow, Sidebar } from './user-interface.js'
//import styles from './interface.module.sass'

// clear error with light-weight-charts library import
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('./chart.js'), {
  ssr: false
});

export default function Interface(props) {
  let layout = props.layout
  let widgets = props.widgets

  if (widgets == "home") {
    return (
      <> 
        <UserInterface layout={layout}>
          <Pane>
            <PaneRow name="primary">
              {/* Terminal */}
              <Widget type="terminal" title="welcome_" icon="triangles">
                <Terminal />
              </Widget>
            </PaneRow>
            <PaneRow name="secondary">
              {/* Source */}
              <Widget type="source" title="src_" icon="triangles">
                <Source />
              </Widget>
              {/* Files */}
              <Widget type="files" title="files_" icon="triangles">
                <Files />
              </Widget>
            </PaneRow>
          </Pane>
          <Sidebar>
            {/* Menu */}
            <PaneRow>
              <Widget type="menu" title="dir_nav_" icon="triangles">
                <Directory widgets={widgets} />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <Visualizer />
              </Widget>
            </PaneRow>
            {/* Report */}
            <PaneRow name="fill">
              <Widget type="report" title="num_rep_" icon="triangles">
                <Report />
              </Widget>
            </PaneRow>
            {/* Social */}
            <PaneRow>
              <Widget type="social" title="social_" icon="globe">
                <Social />
              </Widget>
            </PaneRow>
          </Sidebar>
        </UserInterface>
      </>
    )
  }

  else if (widgets == "mint") {
    return (
      <> 
        <UserInterface layout={layout}>
          <Pane>
            <PaneRow name="primary">
              {/* Mint NFTs */}
              <Widget type={widgets} title="anarchy_nft_t_1_" icon="triangles">
                <MintNft tier="1" />
              </Widget>
              <Widget type={widgets} title="anarchy_nft_t_2_" icon="triangles">
                <MintNft tier="2" />
              </Widget>
              <Widget type={widgets} title="anarchy_nft_t_3_" icon="triangles">
                <MintNft tier="3" />
              </Widget>
            </PaneRow>
            <PaneRow name="secondary">
              {/* Source */}
              <Widget type="news" title="recent_news_" icon="triangles">
                <News />
              </Widget>
            </PaneRow>
          </Pane>
          <Sidebar>
            {/* Menu */}
            <PaneRow>
              <Widget type="menu" title="dir_nav_" icon="triangles">
                <Directory widgets={widgets} />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <Visualizer />
              </Widget>
            </PaneRow>
            {/* Report */}
            <PaneRow name="fill">
              <Widget type="report" title="num_rep_" icon="triangles">
                <Report />
              </Widget>
            </PaneRow>
          </Sidebar>
        </UserInterface>
      </>
    )
  }

  else if (widgets == "manifesto") {
    return (
      <> 
        <UserInterface layout={layout}>
          <Pane>
            <PaneRow name="primary">
              {/* Mint NFTs */}
              <Widget type={widgets} title="anarchy_nft_t_1_" icon="triangles">
                <Page />
              </Widget>
            </PaneRow>
          </Pane>
          <Sidebar>
            {/* Menu */}
            <PaneRow>
              <Widget type="menu" title="dir_nav_" icon="triangles">
                <Directory widgets={widgets} />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <Visualizer />
              </Widget>
            </PaneRow>
            {/* Report */}
            <PaneRow name="fill">
              <Widget type="report" title="num_rep_" icon="triangles">
                <Report />
              </Widget>
            </PaneRow>
            {/* Social */}
            <PaneRow>
              <Widget type="social" title="social_" icon="globe">
                <Social />
              </Widget>
            </PaneRow>
          </Sidebar>
        </UserInterface>
      </>
    )
  }

  else if (widgets == "freedom") {
    return (
      <> 
        <UserInterface layout={layout}>
          <Pane>
            <PaneRow name="primary">
              {/* Terminal */}
              <Widget type="video" title="welcome_" icon="triangles">
              <video style={{ width: '100%', height: '100%', position: 'absolute' }} controls autoPlay muted>
                <source src="/assets/video/placeholder.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              </Widget>
            </PaneRow>
            <PaneRow name="secondary">
              {/* Files */}
              <Widget type="files" title="files_" icon="triangles">
                <Files />
              </Widget>
            </PaneRow>
          </Pane>
          <Sidebar>
            {/* Menu */}
            <PaneRow>
              <Widget type="menu" title="dir_nav_" icon="triangles">
                <Directory widgets={widgets} />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <Visualizer />
              </Widget>
            </PaneRow>
            {/* Report */}
            <PaneRow name="fill">
              <Widget type="report" title="num_rep_" icon="triangles">
                <Report />
              </Widget>
            </PaneRow>
            {/* Social */}
            <PaneRow>
              <Widget type="social" title="social_" icon="globe">
                <Social />
              </Widget>
            </PaneRow>
          </Sidebar>
        </UserInterface>
      </>
    )
  }

  else if (widgets == "dapp") {
    return (
      <> 
        <UserInterface layout={layout}>
          <Pane>
            <PaneRow name="primary">
              {/* Mint NFTs */}
              <Widget type={widgets} title="anarchy_nft_t_1_" icon="triangles">
                <Chart data="add price" />
              </Widget>
            </PaneRow>
            <PaneRow name="secondary">
              {/* Source */}
              <Widget type="news" title="recent_news_" icon="triangles">
                <News />
              </Widget>
            </PaneRow>
          </Pane>
          <Sidebar>
            {/* Menu */}
            <PaneRow>
              <Widget type="menu" title="dir_nav_" icon="triangles">
                <Directory widgets={widgets} />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <Visualizer />
              </Widget>
            </PaneRow>
            {/* Report */}
            <PaneRow name="fill">
              <Widget type="report" title="num_rep_" icon="triangles">
                <Report />
              </Widget>
            </PaneRow>
          </Sidebar>
        </UserInterface>
      </>
    )
  }
}