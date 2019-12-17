import React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import _ from 'lodash'
import { NAVIGATION_BAR_ITEMS } from './components/navigationBar/NavigationBarConstants'
import { hasPermission } from './utils/Permissions'

import { PERMISSIONS } from './components/secutiry/PermissionConstants'
import BuyerInspectionHistory from './pages/inspections/BuyerInspectionHistory'
import TemplateConstructor from './pages/templates/TemplateConstructor'
import TemplateAuditorConstructor from './pages/templates/TemplateAuditorConstructor'
import InspectionPage from './pages/inspections/InspectionPage'
import Templates from './pages/templates/Templates'
import LoginPage from './pages/login/LoginPage'
import AdministrationPage from './pages/administration/AdministrationPage'
import CalendarPage from './pages/administration/calendar/CalendarPage'
import PrioritizationTender from './pages/prioritization/PrioritizationTender'
import PrioritizationBuyer from './pages/prioritization/PrioritizationBuyer'
import SettingsPage from './pages/settings/SettingsPage'
import DocumentationPage from './pages/documentation/DocumentationPage'
import HomePage from './pages/home/HomePage'
import HomePageSwitcher from './HomePageSwitcher'
import HelpUserManuals from './pages/documentation/HelpUserManuals'
import HelpVideos from './pages/documentation/HelpVideos'

export const PublicRoutes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Redirect to="/login" />
  </Switch>
)

const getMenuKeyByPath = (routPath) => {
  let searchMenuObject = {}

  _.forEach(NAVIGATION_BAR_ITEMS, (item) => {
    if (!_.isEmpty(item.subMenu)) {
      _.forEach(item.subMenu, (subItem) => {
        (subItem.path === routPath) && (searchMenuObject = subItem)
      })
    } else {
      (item.path === routPath) && (searchMenuObject = item)
    }
  })

  return searchMenuObject
}

export const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/login" render={() => <Redirect to='/' />} />
    <Route exact path='/' render={(props) => <HomePageSwitcher />} />
    <Route exact path='/templates' render={(props) => <Templates {...props} menuKey={getMenuKeyByPath('/templates')}/>} />
    <Route exact path='/inspections/buyer'
           render={(props) => <BuyerInspectionHistory {...props} menuKey={getMenuKeyByPath('/inspections/buyer')} />} />
    <Route path='/inspections/buyer/add'
           render={(props) => <InspectionPage {...props} menuKey={getMenuKeyByPath('/inspections/buyer')} />} />} />
    <Route exact path='/templates/constructor' component={TemplateConstructor} />
    <Route exact path='/templates/constructor/custom' component={TemplateAuditorConstructor} />
    <Route exact path='/prioritization/tenders' render={(props) => <PrioritizationTender {...props}
                                                                                         menuKey={getMenuKeyByPath('/prioritization/tenders')} />} />
    <Route exact path='/prioritization/buyers' render={(props) => <PrioritizationBuyer {...props}
                                                                                       menuKey={getMenuKeyByPath('/prioritization/buyers')} />} />
    <Route exact path='/prioritization/settings'
           render={(props) => <SettingsPage {...props} menuKey={getMenuKeyByPath('/prioritization/settings')} />} />
    <Route exact path='/documentation'
           render={(props) => <DocumentationPage {...props} menuKey={getMenuKeyByPath('/documentation')} />} />
    {hasPermission(PERMISSIONS.auditorBase) &&<Route exact path='/home'
           render={(props) => <HomePage {...props} menuKey={getMenuKeyByPath('/home')} />} />}
    {/*<PermissionCheck permission={PERMISSIONS.adminBase} routing>*/}
    {hasPermission(PERMISSIONS.adminBase) && <Route exact path='/administration/users'
                                                    render={(props) => <AdministrationPage {...props}
                                                                                           menuKey={getMenuKeyByPath('/administration/users')} />} />}
    {hasPermission(PERMISSIONS.adminBase) && <Route exact path='/administration/calendar'
                                                    render={(props) => <CalendarPage {...props}
                                                                                     menuKey={getMenuKeyByPath('/administration/calendar')} />} />}
    {hasPermission(PERMISSIONS.auditorBase) && <Route exact path='/documentation/manual'
                                                    render={(props) => <HelpUserManuals {...props}
                                                                                     menuKey={getMenuKeyByPath('/documentation/manual')} />} />}
    {(hasPermission(PERMISSIONS.adminBase) || hasPermission(PERMISSIONS.auditorBase)) && <Route exact path='/documentation/videos'
                                                    render={(props) => <HelpVideos {...props}
                                                                                     menuKey={getMenuKeyByPath('/documentation/videos')} />} />}
    {/*</PermissionCheck>*/}
  </Switch>
)