// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Popover from 'material-ui/Popover'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

// icons
import MenuButton from 'material-ui/svg-icons/navigation/menu'
import ChatIcon from 'material-ui/svg-icons/communication/chat'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false
    }
  }

  render() {
    return(
      <MuiThemeProvider>
        <AppBar
            title="chatroom"
            iconElementLeft={ <Nav /> }
          />
      </MuiThemeProvider>
    )
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  rooms() {
    // in the future, this would return some recommended rooms, but for now we can hard code them
    return [
      <ListItem key = { 1 } primaryText = "John" />,
      <ListItem key = { 2 } primaryText = "Paul" />,
      <ListItem key = { 3 } primaryText = "George" />,
      <ListItem key = { 4 } primaryText = "Ringo" />
    ]
  }

  render() {
    return (
      <div>
        <IconButton onTouchTap = { () => this.setState({open: true}) }>
          <MenuButton/>
        </IconButton>
        <Drawer
          docked = { false }
          open = { this.state.open }
          onRequestChange = { () => this.setState({open: false}) } >
            <List>
              <ListItem primaryText = "Profile" leftIcon = { <AccountIcon /> }/>
              <ListItem primaryText = "Settings" leftIcon = { <SettingsIcon /> }/>
              <ListItem primaryText = "Rooms"
                        leftIcon = { <ChatIcon /> }
                        nestedItems = { this.rooms() }
                        primaryTogglesNestedList = { true }
                        initiallyOpen = { false } />
              <Divider />
              <ListItem primaryText = "Log out" leftIcon = { <ExitIcon /> }/>
            </List>
        </Drawer>
      </div>
    )
  }
}

render((
  <Router history = { hashHistory }>
    <Route path = "/" component = { Main }>
      <Route path = "profile" component = { Main } />
      <Route path = "settings" component = { Main } />
    </Route>
  </Router>
), document.getElementById('app'))