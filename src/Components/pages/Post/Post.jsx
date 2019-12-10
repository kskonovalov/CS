import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import parse from 'html-react-parser';

import Loader from '../../layout/Loader';
import { setTitle } from '../../../actions';
import getPostBySlugQuery from './getPostBySlugQuery';

const ButtonBack = () => {
  return (
    <Link to="/">
      <Button variant="outline-primary">&larr; Back to posts</Button>
    </Link>
  );
};

const Post = ({ data, onSetTitle }) => {
  const { loading, error, post } = data;
  if (loading) {
    setTitle('Post is loading..');
    return <Loader />;
  }
  if (error) {
    setTitle('Failed to load post');
    return <>Oops, smth went wrong!</>;
  }

  // console.log(data);
  const { content, title } = post;
  onSetTitle(title);
  return (
    <>
      <ButtonBack />
      <article>{parse(content)}</article>
      <ButtonBack />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  onSetTitle: title => dispatch(setTitle(title))
});

export default connect(
  null,
  mapDispatchToProps
)(
  graphql(getPostBySlugQuery, {
    options: props => {
      const { slug } = props.match.params;
      return {
        variables: {
          slug
        }
      };
    }
  })(Post)
);