import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import './style.css';

const link = 'https://seeklogo.com/images/I/instagram-new-2016-logo-4773FE3F99-seeklogo.com.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { user, pass } = this.state;
    if (user === 'gabriel' && pass === '123') {
      this.props.router.push('/home');
    } else {
      alert('Dados incorretos');
    }
  }

  render() {
    const { user, pass } = this.state;
    console.log(this.props)

    return (
      <div className='LoginForm'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center' className="LoginForm-title">
              <Image src={link} />
              {' '}Acessar o Managegram
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Usuário'
                  name='user'
                  value={user}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                  name='pass'
                  value={pass}
                  onChange={this.handleChange}
                />
                <Button className="LoginForm-button" fluid size='large'>Entrar</Button>
              </Segment>
            </Form>
            <Message>
              Se não possuir conta basta inserir um usuário e senha que o cadastro será feito automaticamente.
            </Message>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
}

export default withRouter(LoginForm);
