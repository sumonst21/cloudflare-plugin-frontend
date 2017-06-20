import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import { Box } from 'cf-component-box';
import { Button } from 'cf-component-button';
import { Heading } from 'cf-component-heading';

import { Card, CardSection } from 'cf-component-card';

import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';

import BenefitsCollection
  from '../../containers/BenefitsCollection/BenefitsCollection';

import {
  CLOUDFLARE_SIGNUP_PAGE,
  LOGIN_PAGE,
  HOME_PAGE
} from '../../constants/UrlPaths.js';
import { isLoggedIn } from '../../utils/Auth/Auth';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import { openWindow720x720 } from '../../utils/utils.js';
import { getConfigValue } from '../../selectors/config';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';
import { generateChannelLink } from '../../selectors/generateChannelLink.js';

const SIGNUP_SPLASH_UTM_CONTENT_IDENTIFIER = 'signup_splash_page';

const cardBoxStyles = {
  margin: '2em auto',
  maxWidth: '1024px',
  textAlign: 'center'
};

const linkStyles = {
  textDecoration: 'none',
  color: '#1592E6'
};

const textStyles = {
  color: '#9A9D9E'
};

const cardPaddingStyles = {
  padding: '65px 0'
};

class SplashPage extends Component {
  componentWillMount() {
    let { dispatch } = this.props;
    if (isLoggedIn()) {
      dispatch(push(HOME_PAGE));
    }
  }

  render() {
    const { config } = this.props;

    let signupLinkWithUTM = generateUTMLink(
      CLOUDFLARE_SIGNUP_PAGE,
      getConfigValue(config, 'integrationName'),
      getConfigValue(config, 'integrationName'),
      SIGNUP_SPLASH_UTM_CONTENT_IDENTIFIER
    );

    let signupLinkWithUTMAndChannel = generateChannelLink(
      signupLinkWithUTM,
      getConfigValue(config, 'integrationName')
    );

    return (
      <Box {...cardBoxStyles}>
        <Card>
          <Box {...cardPaddingStyles}>
            <CardSection>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Heading size={1}>
                      <FormattedMessage id="container.splashPage.heading.speedUp" />
                    </Heading>
                  </LayoutColumn>
                </LayoutRow>

                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Button
                      type="success"
                      onClick={openWindow720x720.bind(
                        this,
                        signupLinkWithUTMAndChannel
                      )}
                    >
                      <FormattedMessage id="container.splashPage.button.createFreeAccount" />
                    </Button>
                  </LayoutColumn>
                </LayoutRow>

                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <p style={textStyles}>
                      <FormattedMessage id="container.splashPage.help.alreadyHaveAccount" />
                      {' '}
                      <Link style={linkStyles} to={LOGIN_PAGE}>
                        <FormattedMessage id="container.splashPage.help.here" />
                      </Link>
                      .
                    </p>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <BenefitsCollection />
                  </LayoutColumn>
                </LayoutRow>
              </LayoutContainer>

            </CardSection>
          </Box>
        </Card>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

export default injectIntl(connect(mapStateToProps)(SplashPage));
