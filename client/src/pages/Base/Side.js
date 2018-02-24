import React from 'react';
import { Sidebar, Menu, Image, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';

const img = 'https://instagram.fssa2-1.fna.fbcdn.net/vp/37fb9aab7f61e2dfd157af7f89169730/5B0C1D96/t51.2885-19/s150x150/27891794_147273229266874_5828571062224289792_n.jpg';
const user = 'FabIT Instagram';

const Side = (props) => (
  <Sidebar
    className="Side"
    animation='slide along'
    visible={props.visible}
  >
    <Menu vertical fluid className="Side-menu">
      <Menu.Item className="Side-user Side-item">
        <Image src={img} size="tiny" avatar />
        <div className="Side-user-name">{user}</div>
      </Menu.Item>

      <Menu.Item
        className="Side-menu-item Side-item"
        onClick={() => props.router.push('/home')}
      >
        <Icon name="home" className="Side-icon" size="large" />
        Inicio
      </Menu.Item>

      <Menu.Item
        className="Side-menu-item Side-item"
        onClick={() => props.router.push('/configure')}
      >
        <Icon name="setting" className="Side-icon" size="large" />
        Gerenciar Perfil
      </Menu.Item>
      <Menu.Item
        className="Side-menu-item Side-item"
        onClick={() => props.router.push('/')}
      >
        <Icon name="log out" className="Side-icon" size="large" />
        Sair
      </Menu.Item>
      <Menu.Item>
      </Menu.Item>
    </Menu >
  </Sidebar >
);

export default withRouter(Side);
