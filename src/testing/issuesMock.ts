import { Issue } from '../app/models/github/github';
export const issuesMock: Issue[] = [
  {
    url: 'https://api.github.com/repos/hugoblanc/Athena/issues/17',
    repository_url: 'https://api.github.com/repos/hugoblanc/Athena',
    labels_url: 'https://api.github.com/repos/hugoblanc/Athena/issues/17/labels{/name}',
    comments_url: 'https://api.github.com/repos/hugoblanc/Athena/issues/17/comments',
    events_url: 'https://api.github.com/repos/hugoblanc/Athena/issues/17/events',
    html_url: 'https://github.com/hugoblanc/Athena/issues/17',
    id: 625992632,
    node_id: 'MDU6SXNzdWU2MjU5OTI2MzI=',
    number: 17,
    title: 'L\'ajout nouveau média => 10 notifications',
    user: {
      login: 'hugoblanc',
      id: 15015179,
      node_id: 'MDQ6VXNlcjE1MDE1MTc5',
      avatar_url: 'https://avatars3.githubusercontent.com/u/15015179?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/hugoblanc',
      html_url: 'https://github.com/hugoblanc',
      followers_url: 'https://api.github.com/users/hugoblanc/followers',
      following_url: 'https://api.github.com/users/hugoblanc/following{/other_user}',
      gists_url: 'https://api.github.com/users/hugoblanc/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/hugoblanc/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/hugoblanc/subscriptions',
      organizations_url: 'https://api.github.com/users/hugoblanc/orgs',
      repos_url: 'https://api.github.com/users/hugoblanc/repos',
      events_url: 'https://api.github.com/users/hugoblanc/events{/privacy}',
      received_events_url: 'https://api.github.com/users/hugoblanc/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1415804329,
        node_id: 'MDU6TGFiZWwxNDE1ODA0MzI5',
        url: 'https://api.github.com/repos/hugoblanc/Athena/labels/bug',
        name: 'bug',
        color: 'd73a4a',
        default: true,
        description: 'Something isn\'t working'
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [

    ],
    milestone: null,
    comments: 2,
    created_at: '2020-05-27T20:02:41Z',
    updated_at: '2020-05-27T20:02:44Z',
    closed_at: null,
    author_association: 'OWNER',
    body: 'l\'ajout d\'un nouveau média déclenche l\'envoi de 10 notifications'
  }
];

