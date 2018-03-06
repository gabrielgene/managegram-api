import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { getUser, getUpdateAdmEnable, getUpdateAdmDisable } from '../../fetches';

class Admin extends Component {
  state = {
    isAdmin: false,
    usersList: [],
  }

  usersData = async () => {
    const usersList = await getUser();
    this.setState({ usersList });
    console.log(usersList)
  }

  componentDidMount() {
    // const value = prompt('Admin password');
    const value = 'gabriel123';
    if (value === 'gabriel123') {
      this.setState({ isAdmin: true }, this.usersData);
    }
  }

  enableAccount = async (e) => {
    const usersList = await getUpdateAdmEnable(e.target.value);
    this.setState({ usersList });
  }

  disableAccount = async (e) => {
    const usersList = await getUpdateAdmDisable(e.target.value);
    this.setState({ usersList });
  }

  render() {
    const { isAdmin, usersList } = this.state;
    return (
      <div>
        {
          isAdmin
            ?
            <Table columns={6}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>userId</Table.HeaderCell>
                  <Table.HeaderCell>user</Table.HeaderCell>
                  <Table.HeaderCell>insta_user</Table.HeaderCell>
                  <Table.HeaderCell>enable_account</Table.HeaderCell>
                  <Table.HeaderCell>service_on</Table.HeaderCell>
                  <Table.HeaderCell>verified_account</Table.HeaderCell>
                  <Table.HeaderCell>button</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  usersList.map(user => (
                    <Table.Row key={user.user}>
                      <Table.Cell>{user.userId}</Table.Cell>
                      <Table.Cell>{user.user}</Table.Cell>
                      <Table.Cell><a target="_blank" href={`https://www.instagram.com/${user.insta_user}/`}>{user.insta_user}</a></Table.Cell>
                      <Table.Cell>{String(user.enable_account)}</Table.Cell>
                      <Table.Cell>{String(user.service_on)}</Table.Cell>
                      <Table.Cell>{String(user.verified_account)}</Table.Cell>
                      <Table.Cell>
                        {
                          user.enable_account
                            ?
                            <Button onClick={this.disableAccount} primary value={user.userId} >Disable Account</Button>
                            :
                            <Button onClick={this.enableAccount} secondary value={user.userId} >Enable Account</Button>
                        }
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>

            </Table>
            :
            <div>
              Acesso Negado !
            </div>
        }
      </div>
    )
  }
}

export default Admin;
