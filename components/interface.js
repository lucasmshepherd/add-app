import Widget from './widget.js'
import Source from './source.js'
import Files from './files.js'
import Terminal from './terminal.js'
import Directory from './directory.js'
import Report from './report.js'
import Visualizer from './visualizer.js'
import UserInterface, { Pane, PaneRow, Sidebar } from './user-interface.js'
//import styles from './interface.module.sass'

export default function Interface(props) {
  let uiLayout = "default"
  return (
    <> 
      <UserInterface layout={uiLayout}>
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
              <Directory />
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
          <PaneRow name="medium">
            <Widget type="social" title="social_" icon="globe" />
          </PaneRow>
        </Sidebar>
      </UserInterface>
    </>
  )
}