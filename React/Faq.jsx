"use strict";
var React = require("react/addons");
var PageLayout = require("./PageLayout");

var Faq = React.createClass({
  componentWillMount: function() {
    this.props.headParams.setTitle(this.props.i18n.faq.title);
    this.props.headParams.setDescription(this.props.i18n.faq.description);
  },

  render: function() {
    var faqItemNodes = this.props.i18n.faq.items.map(function(item, key) {
      return <FaqItem key={key} question={item.question} answer={item.answer} />;
    });

    return (
      <PageLayout {...this.props}>
        <h1>{this.props.i18n.faq.title}</h1>
        <ul>
          {faqItemNodes}
        </ul>
      </PageLayout>
    );
  }
});

var FaqItem = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  handleClick: function() {
    this.setState({
      active: !this.state.active
    });
  },

  render: function() {
    var classMap = {
      "faq-item": true,
      active: this.state.active
    };
    var faqItemClasses = React.addons.classSet(classMap);

    return (
      <li className={faqItemClasses} onClick={this.handleClick}>
        <div className="q lh">{this.props.question}</div>
        <div className="a lh">{this.props.answer}</div>
      </li>
    );
  }
});

module.exports = Faq;
