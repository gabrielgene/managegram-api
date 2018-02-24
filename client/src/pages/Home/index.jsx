import React, { Component } from 'react';
import Topbar from '../../components/Topbar';
import { Icon, Card, Form, List, Button, TextArea, Checkbox, Message } from 'semantic-ui-react';
import './style.css';

const userData = {
  user: 'managerinsta97',
  pass: 'insta@123',
  insta_user: '',
  insta_pass: '',
  service_on: false,
  tag_type: false,
  tag_list: [],
  profile_type: false,
  profile_list: [],
  dm_type: false,
  dm_message: '',
  verified_account: false,
  enable_account: false,
}

const listLimit = 7;

class Configure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData,
      verified: {
        loading: false,
      },
      changes: false,
      max_list_size: false,
      empty_field: true,
      tag_list: '',
      profile_list: '',
    }
  }

  verifyAccount = () => {
    this.setState({ verified: { loading: true } });
    setTimeout(() => this.setState(
      {
        userData: {
          ...this.state.userData,
          verified_account: true,
        },
        verified: {
          loading: false,
        }
      }), 2000);
  }

  toggle = (e, { name }) => {
    this.setState({ changes: true }, this.setState({ userData: { ...this.state.userData, [name]: !this.state.userData[name] } }));
  }

  handleChange = (e, { name, value }) => {
    this.setState({ changes: true }, this.setState({ userData: { ...this.state.userData, [name]: value } }));
  }

  handleChangeInsta = (e, { name, value }) => {
    this.setState({ userData: { ...this.state.userData, [name]: value, verified_account: false } });
  }

  toggleService = () => this.setState({ userData: { ...this.state.userData, service_on: !this.state.userData.service_on } });

  saveChanges = () => this.setState({ changes: false });

  addInTagList = () => {
    this.setState({ changes: true });
    const tag_list = this.state.userData.tag_list;
    if (tag_list.length === listLimit) {
      this.setState({ max_list_size: true });
    } else {
      tag_list.push(this.state.tag_list);

      this.setState({
        userData: {
          ...this.state.userData,
          tag_list
        }
      }, this.setState({ tag_list: '' }));
    }
  }

  addInProfileList = () => {
    this.setState({ changes: true });
    const profile_list = this.state.userData.profile_list;
    if (profile_list.length === listLimit) {
      this.setState({ max_list_size: true });
    } else {
      profile_list.push(this.state.profile_list);

      this.setState({
        userData: {
          ...this.state.userData,
          profile_list
        }
      }, this.setState({ profile_list: '' }));
    }
  }

  removeListItem = (e) => {
    this.setState({ changes: true });
    const { name, value } = e.target;
    const list = this.state.userData[name];
    const idx = list.indexOf(value);
    if (idx > -1) {
      list.splice(idx, 1);
      this.setState({ userData: { ...this.state.userData, [name]: list } });
    }
  }

  listInputChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const {
      insta_user,
      insta_pass,
      service_on,
      tag_type,
      tag_list,
      profile_type,
      profile_list,
      dm_type,
      dm_message,
      verified_account,
      enable_account,
    } = this.state.userData;

    const { verified, changes, max_list_size } = this.state;
    const tag_value = this.state.tag_list;
    const profile_value = this.state.profile_list;

    return (
      <div>
        <Topbar />

        <div className="Configure-message">
          {
            changes ?
              <Message
                attached
                warning
              >
                <Icon name="save" />
                Por favor <strong style={{ cursor: 'pointer' }} onClick={this.saveChanges}>salve as alterações feitas.</strong>
              </Message>
              :
              ''
          }
          {
            max_list_size ?
              <Message
                attached
                warning
              >
                <Icon name="unordered list" />
                Para segurança da sua conta as listas só podem conter até {listLimit} itens.
              </Message>
              :
              ''
          }
          {
            service_on ?
              ''
              :
              <Message
                error
                attached
              >
                <Icon name="pause circle outline" />
                O serviço não está habilitado no momento para habilitar   <strong style={{ cursor: 'pointer' }} onClick={this.toggleService}>click aqui</strong>
              </Message>
          }
          {
            enable_account ?
              ''
              :
              <Message
                info
                attached
              >
                <Icon name="info" />
                Sua conta ainda não está em funcionamento, aguarde os gerenciadores habilitarem a sua conta, ou envie um email para <strong>gabrielgene97@gmail.com</strong>
              </Message>
          }
          {
            verified_account ?
              ''
              :
              <Message
                error
                attached
              >
                <Icon name="warning" />
                Por favor verifique a sua conta do instagram.
              </Message>
          }
        </div>

        <div className="Configure">
          <Card fluid>
            <div className="Configure-account">
              <div className="Configure-account-verify">
                <Form inverted onSubmit={this.verifyAccount}>
                  <Form.Group widths="equal">
                    <Form.Input
                      required
                      icon="user"
                      iconPosition="left"
                      placeholder="Usuário do instagram"
                      name="insta_user"
                      value={insta_user}
                      onChange={this.handleChangeInsta}
                    />
                    <Form.Input
                      required
                      icon="lock"
                      iconPosition="left"
                      placeholder="Senha do instagram"
                      name="insta_pass"
                      value={insta_pass}
                      type="password"
                      onChange={this.handleChangeInsta}
                    />
                  </Form.Group>
                  {
                    verified_account ?
                      <Form.Button fluid color="green">
                        <Icon name="undo" />
                        Atualizar conta
                      </Form.Button>
                      :
                      <Form.Button fluid color="yellow" loading={verified.loading}>
                        <Icon name="warning" />
                        Verificar conta
                      </Form.Button>
                  }
                </Form>
              </div>
              <Card.Group>
                <Card className="Configure-account-manager">
                  <Card.Content header="Gerenciar conta" />
                  <Card.Content>
                    <Checkbox
                      className="Configure-account-manager-item"
                      label="Seguir por tag"
                      name="tag_type"
                      checked={tag_type}
                      onChange={this.toggle}
                    />
                    <Checkbox
                      className="Configure-account-manager-item"
                      label="Seguir por perfil"
                      name="profile_type"
                      checked={profile_type}
                      onChange={this.toggle}
                    />
                    <Checkbox
                      className="Configure-account-manager-item"
                      label="Enviar DM ao ser seguido."
                      name="dm_type"
                      checked={dm_type}
                      onChange={this.toggle}
                    />
                  </Card.Content>
                </Card>
                <Card className="Configure-account-manager">
                  <Card.Content header="Opções" />
                  <Card.Content>
                    {
                      changes ?
                        <Button primary fluid className="Configure-account-manager-button" onClick={this.saveChanges}>Salvar alterações</Button>
                        :
                        <Button positive disabled fluid className="Configure-account-manager-button">Configurações atualizadas</Button>
                    }
                    {
                      service_on ?
                        <Button negative fluid className="Configure-account-manager-button" onClick={this.toggleService}>Desabilitar serviço</Button>
                        :
                        <Button positive fluid className="Configure-account-manager-button" onClick={this.toggleService}>Habilitar serviço</Button>
                    }
                  </Card.Content>
                </Card>
              </Card.Group>

            </div>


            <Form>
              <div className="Configure-tasks">
                <div>
                  <Card.Group className="Configure-tasks-group">
                    <Card className="Configure-tasks-group-card">
                      <Card.Content>
                        <Form.Group>
                          <Form.Field>
                            <label>Adicionar Tag</label>
                            <input placeholder="Ex: comida, fitness, festa" name="tag_list" value={tag_value} onChange={this.listInputChange} />
                          </Form.Field>
                          <div>
                            <Button icon="add" className="Configure-tasks-group-card-button" onClick={this.addInTagList} />
                          </div>
                        </Form.Group>
                        <List celled verticalAlign="middle" className="Configure-tasks-group-card-list">
                          {
                            tag_list.map((tag, idx) => (
                              <List.Item key={`${tag}${idx}`}>
                                <List.Content floated="right" verticalAlign="middle">
                                  <Button value={tag} name="tag_list" onClick={this.removeListItem}>Remover</Button>
                                </List.Content>
                                <div className="Configure-tasks-group-card-list-item">
                                  <Icon name="user circle" />
                                  <List.Content verticalAlign="middle">
                                    {tag}
                                  </List.Content>
                                </div>
                              </List.Item>
                            ))
                          }
                        </List>
                      </Card.Content>
                    </Card>

                    <Card className="Configure-tasks-group-card">
                      <Card.Content>
                        <Form.Group>
                          <Form.Field>
                            <label>Adicionar Perfil</label>
                            <input placeholder="Ex: facebook, instagram, marvel" name="profile_list" value={profile_value} onChange={this.listInputChange} />
                          </Form.Field>
                          <div>
                            <Button icon="add" className="Configure-tasks-group-card-button" onClick={this.addInProfileList} />
                          </div>
                        </Form.Group>
                        <List celled verticalAlign="middle" className="Configure-tasks-group-card-list">
                          {
                            profile_list.map((profile, idx) => (
                              <List.Item key={`${profile}${idx}`}>
                                <List.Content floated="right" verticalAlign="middle">
                                  <Button value={profile} name="profile_list" onClick={this.removeListItem}>Remover</Button>
                                </List.Content>
                                <div className="Configure-tasks-group-card-list-item">
                                  <Icon name="user circle" />
                                  <List.Content verticalAlign="middle">
                                    {profile}
                                  </List.Content>
                                </div>
                              </List.Item>
                            ))
                          }
                        </List>
                      </Card.Content>
                    </Card>

                    <Card className="Configure-tasks-group-card-dm">
                      <Card.Content header="Adicionar Direct Message" />
                      <Card.Content>
                        <TextArea
                          placeholder="Ex: Olá, muito obrigado por seguir o managegram."
                          style={{ minHeight: 120 }}
                          name="dm_message"
                          value={dm_message}
                          onChange={this.handleChange}
                        />
                      </Card.Content>
                    </Card>
                  </Card.Group>

                </div>
              </div>
            </Form>
          </Card >
        </div>
      </div>
    )
  }
}

export default Configure;
