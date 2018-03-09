import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { postLogin } from '../../fetches';
import './style.css';

const link = 'https://seeklogo.com/images/I/instagram-new-2016-logo-4773FE3F99-seeklogo.com.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      error: false,
    }
  }

  login = async (user, pass) => {
    const login = {
      user,
      pass,
    };

    const loginStatus = await postLogin(login);
    if (loginStatus === 200) {
      this.props.router.push('/home');
    } else if (loginStatus === 409) {
      this.setState({ error: true })
    } else if (loginStatus === 201) {
      this.props.router.push('/home');
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { user, pass } = this.state;
    this.login(user, pass);
  }

  render() {
    const { user, pass, error } = this.state;

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
              {' '}Acessar o ManageGram
            </Header>
            <Form error={error} size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Usuário'
                  name='user'
                  value={user}
                  onChange={this.handleChange}
                  required
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
                  required
                />
                <Button className="LoginForm-button" fluid size='large'>Entrar</Button>
                <Message
                  error
                  header='Senha incorreta'
                />
              </Segment>
            </Form>
            <Message>
              Se não possuir conta basta inserir um usuário e senha que o cadastro será feito automaticamente.
            </Message>
          </Grid.Column>
        </Grid>
        <a onClick={() => this.props.router.push('/admin')}>
          Admin
        </a>
      </div>

    )
  }
}

export default withRouter(LoginForm);
