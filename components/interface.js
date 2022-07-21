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
import UserInterface, { Pane, PaneRow, Sidebar } from './user-interface.js'
//import styles from './interface.module.sass'

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
                <Directory widgets="home" />
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
              <Widget type="mint" title="anarchy_nft_t_1_" icon="triangles">
                <MintNft tier="1" />
              </Widget>
              <Widget type="mint" title="anarchy_nft_t_2_" icon="triangles">
                <MintNft tier="2" />
              </Widget>
              <Widget type="mint" title="anarchy_nft_t_3_" icon="triangles">
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
                <Directory widgets="mint" />
              </Widget>
            </PaneRow>
            {/* Audio */}
            <PaneRow name="small">
              <Widget type="audio" title="freq_v_" icon="arc">
                <AudioVisualizer />
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
}