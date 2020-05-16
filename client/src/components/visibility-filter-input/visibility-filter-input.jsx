import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
        <Row>
            <Col>1 of 1</Col>
            <Col xs={11} sm={8} md={3} className="form-container">
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
