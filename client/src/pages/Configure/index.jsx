import React, { Component } from 'react';
import { Icon, Card, Form, Input, List, Button, TextArea, Image, Checkbox } from 'semantic-ui-react';
import './style.css';

class Configure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'managerinsta97',
      pass: 'insta@123',
      status: 'stop',
      tag_type: 'enable',
      tag_list: ['hero', 'food', 'ola', 'buu', 'baa'],
      profile_type: 'enable',
      profile_list: ['marvel', 'facebook'],
      dm_type: 'enable',
      dm_message: 'Olá, se você recebeu está funcionando',
    }
  }

  render() {
    const {
      user,
      pass,
      status,
      tag_type,
      tag_list,
      profile_type,
      profile_list,
      dm_type,
      dm_message
    } = this.state;

    return (
      <div>
        <Card fluid className="Configure">
          <div className="Configure-account">
            <div className="Configure-account-verify">
              <Form inverted>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Usuário do instagram</label>
                    <input placeholder="Ex: managegram" />
                  </Form.Field>
                  <Form.Field>
                    <label>Senha do instagram</label>
                    <input placeholder="Ex: managegram123" type="password" />
                  </Form.Field>
                </Form.Group>
              </Form>
              <Button fluid color="green">Conta Verificada</Button>
            </div>

            <Card className="Configure-account-manager">
              <Card.Content header="Gerenciar conta" />
              <Card.Content>
                <Checkbox className="Configure-account-manager-item" label="Seguir por tag" />
                <Checkbox className="Configure-account-manager-item" label="Seguir por perfil" />
                <Checkbox className="Configure-account-manager-item" label="Enviar DM ao ser seguido." />
              </Card.Content>
            </Card>
          </div>


          <Form>
            <div className="Configure-tasks">
              <div>
                <Card.Group className="Configure-tasks-group">
                  <Card className="Configure-tasks-group-card">
                    <Card.Content>
                      <Form.Field>
                        <label>Adicionar Tag</label>
                        <input placeholder="Ex: comida, fitness, festa" />
                      </Form.Field>
                      <List celled verticalAlign="middle" className="Configure-tasks-group-card-list">
                        {
                          tag_list.map((tag, idx) => (
                            <List.Item key={`${tag}${idx}`}>
                              <List.Content floated="right" verticalAlign="middle">
                                <Button>Remover</Button>
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
                      <Form.Field>
                        <label>Adicionar Tag</label>
                        <input placeholder="Ex: comida, fitness, festa" />
                      </Form.Field>
                      <List celled verticalAlign="middle" className="Configure-tasks-group-card-list">
                        {
                          profile_list.map((profile, idx) => (
                            <List.Item key={`${profile}${idx}`}>
                              <List.Content floated="right" verticalAlign="middle">
                                <Button>Remover</Button>
                              </List.Content>
                              <div className="Configure-tasks-group-card-item">
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
                      />
                      <div className="Configure-tasks-group-card-dm-button">
                        <Button secondary fluid >Atualizar direct message</Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>

              </div>
            </div>
          </Form>
        </Card >
        <Button primary fluid>Salvar</Button>

      </div>
    )
  }
}

export default Configure;
