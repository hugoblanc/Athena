import { Issue } from '../app/models/idea/idea';

// Mock d'une idée servie par l'API Athena (GET /issues). Les URLs pointent
// sur l'API Athena, pas sur GitHub : la source des idées a migré en BDD
// (cf. athena_api/src/idea).
export const ideasMock: Issue[] = [
  {
    url: 'https://www.athena-app.fr/issues/17',
    html_url: 'https://www.athena-app.fr/issues/17',
    comments_url: 'https://www.athena-app.fr/issues/17/comments',
    id: 625992632,
    number: 17,
    title: 'L\'ajout nouveau média => 10 notifications',
    user: {
      login: 'hugoblanc',
      id: 15015179,
      node_id: '',
      avatar_url: 'https://www.athena-app.fr/img/avatar/hugoblanc.png',
      gravatar_id: '',
      url: 'https://www.athena-app.fr/users/hugoblanc',
      html_url: 'https://www.athena-app.fr/users/hugoblanc',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1415804329,
        name: 'bug',
        color: 'd73a4a',
        default: true,
        description: 'Something isn\'t working'
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 2,
    created_at: '2020-05-27T20:02:41Z',
    updated_at: '2020-05-27T20:02:44Z',
    closed_at: null,
    author_association: 'OWNER',
    body: 'l\'ajout d\'un nouveau média déclenche l\'envoi de 10 notifications'
  }
];
