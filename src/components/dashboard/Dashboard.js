import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase';

import { compose } from 'redux';

import Switch from 'react-switch';

import { inEvent, outEvent } from '../../store/actions/eventActions';

import CustomChatbot from './CustomChatbot';

// import { eventsData } from '../../data';

import '../../css/Dashboard.css';

import EventDashboard from './EventDashboard';
import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';

import SocialMediaButtons from 'react-social-media-buttons';


// let eventInitial = [...eventsData];

const eventInitial = [];

class Dashboard extends Component {
    
    state = {
        // events: [],

        typeInput: { Sport: false, Meetup: false, Party: false, Presentation: false, Other: false },

        searchTerm: ''

        // checked: false,

        // enrollments: [],
    };

    handleSearchChange = event => {
        const { name, type, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    // filter by search and event type

    filterEvent = () => {
        const { eventsFB } = this.props;

        const { typeInput, searchTerm } = this.state;

        console.log(eventsFB);

        if (eventsFB) {
            let eventFilter = [];

            if (Object.values(typeInput).filter(item => item === true).length === 0) {
                eventFilter = eventsFB;
            } else {
                const typeFilter = eventsFB.filter(event => {
                    if (typeInput[event.type] === true) {
                        return event;
                    }
                });

                eventFilter = typeFilter;
            }

            eventFilter = eventFilter.filter(event => {
                if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return event;
                }
            });
            // not show old event

            eventFilter = eventFilter.filter(event => {
                const today = Date.now();
                // console.log(today * 1000);
                // console.log(event.date.seconds);
                if (event.date.seconds * 1000 >= today) {
                    return event;
                }
            });

            return eventFilter;
        }
    };

    // for the switch library

    handleSwitchChange = (checked, event, id) => {
        console.log(id);

        const typeInput = { ...this.state.typeInput };

        typeInput[id] = !typeInput[id];

        this.setState({
            typeInput
        });
    };

    enrollAction = (type, eventId) => {
        console.log(type, eventId);

        if (type === 'in') {
            this.props.inEvent(eventId);
        }

        if (type === 'out') {
            this.props.outEvent(eventId);
        }
    };

    render() {
        const { typeInput, searchTerm } = this.state;

        const { auth } = this.props;
        console.log(auth);

        const eventFilter = this.filterEvent();

        const renderEvents =
            eventFilter &&
            eventFilter.map(event => (
                <EventDashboard
                    key={event.id}
                    event={event}
                    history={this.props.history}
                    enrollAction={this.enrollAction}
                    userId={auth.uid}
                />
            ));

        const renderType = Object.keys(typeInput).map(typeItem => (
            <div className="search-switch" key={typeItem}>
                <Switch
                    type="checkbox"
                    id={typeItem}
                    name={typeItem}
                    checked={typeInput[typeItem]}
                    // checked={this.state.checked}

                    // onChange={this.handleInputChange}

                    onChange={this.handleSwitchChange}
                    onColor="#f3cf74"
                    onHandleColor="#ffb600"
                    handleDiameter={15}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={30}
                    className="react-switch"

                    // id="material-switch"
                />

                <label htmlFor={typeItem} style={{ color: '#ffb600', textDecoration: 'underline', marginTop: '5px' }}>
                    {typeItem}
                </label>
                
            </div>
        ));



       
 
  const buttonStyle = {
    backgroundColor: '#ED6762',
    borderRadius: '50%',
    width:30,
    height:30
  };
 
  const iconStyle = { color: '#ffffff' };

        return (
            <>
                <NavbarWithDrawer pageName="Dashboard" />
                <main>
                    <div className="Dashboard">
                        <section className="search-box-add">
                            <div style={{ color: 'black', paddingLeft: '1.5rem', fontSize: '1.5rem' }}>
                                Hi {this.props.profile.name}
                            </div>

                            <form action="" className="search-form">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="search-input"
                                    value={searchTerm}
                                    name="searchTerm"
                                    onChange={this.handleSearchChange}
                                />

                                <div className="search-checkboxes">{renderType}</div>
                            </form>

                            <NavLink
                                exact
                                to="/create-event"
                                className="Dashboard-CreateEvent"
                                style={{ cursor: 'pointer' }}
                            />
                        </section>

                        <section className="events-section">
                            <div className="events">{renderEvents}</div>
                        </section>
                        <CustomChatbot />
                    </div>
<div >
      <SocialMediaButtons links = {['https://github.com/WafaBergaoui/Hackaton_Intranet', 'https://www.linkedin.com/company/dna-global']} buttonStyle={buttonStyle} iconStyle={iconStyle} />
    </div>
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    const { events } = state.firestore.ordered;

    return {
        eventsJS: events,

        eventsFB: events,

        auth: state.firebase.auth,

        profile: state.firebase.profile
    };
};

const mapDispatchToProps = dispatch => ({
    inEvent: eventId => dispatch(inEvent(eventId)),

    outEvent: eventId => dispatch(outEvent(eventId))
});

export default compose(
    connect(
        mapStateToProps,

        mapDispatchToProps
    ),

    firestoreConnect([{ collection: 'events', orderBy: ['date', 'asc'] }])
)(Dashboard);
