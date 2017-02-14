import React, { Component } from 'react';
import { getLinksForPlace } from '../libs/LinkGetter';

import Layout from './Layout';
import Wall from './Wall';
import ProfileMenu from './ProfileMenu';
import ProfileHeader from './ProfileHeader';
import WallFirstColumn from './WallFirstColumn';
import WallMiniMap from './WallMiniMap';
import LinksList from './LinksList';
import WallBody from './WallBody';

export default class Profile extends Component {
  componentWillMount() {
    const { headParams, i18n } = this.props;
    const { profile } = this.props.data;

    headParams.setTitle(i18n._(i18n.profile.title, profile));
    headParams.setDescription(i18n._(i18n.profile.description, profile));
  }

  render() {
    const { i18n } = this.props;
    const { profile, posts } = this.props.data;

    const links = profile.kind === 'place' ? getLinksForPlace({ id: profile.id }) : [];

    return (
      <Layout {...this.props}>
        <Wall>
          <ProfileMenu profile={profile} />

          <ProfileHeader profile={profile} />

          <WallFirstColumn>
            <WallMiniMap>
              <LinksList i18n={i18n} kind={profile.kind} links={links} />
            </WallMiniMap>
          </WallFirstColumn>

          <WallBody posts={posts} profiles={[profile]} profileId={profile.id} />
        </Wall>
      </Layout>
    );
  }
}
