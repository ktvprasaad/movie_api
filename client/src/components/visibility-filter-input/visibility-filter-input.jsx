import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
        <Row className="justify-content-left">
        <Col xs={11} sm={8} md={6} className="form-container">
        <Form.Control 
            onChange={e => props.setFilter(e.target.value)} 
            value={props.visibilityFilter} 
            placeholder="filter"
        />
        </Col>
        </Row>
    );
}

export default connect(
    null, 
    { setFilter }
)(VisibilityFilterInput);
