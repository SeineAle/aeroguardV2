import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

// Example actions for post interaction
const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

// Function to return the color class based on risk level
const getRiskColorClass = (risk) => {
  switch (risk.toLowerCase()) {
    case 'nightmare':
      return 'text-violet-800';
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-400';
  }
};

// Function to return the background class based on status
const getStatusColorClass = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-blue-200 text-blue-800';
    case 'resolved':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Function to return SVG circles based on risk
const RiskIndicator = ({ risk }) => {
  const colorClass = getRiskColorClass(risk);
  return (
    <div className="flex space-x-1">
      <svg className={`w-4 h-4 ${colorClass}`} fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
      </svg>
      <svg className={`w-4 h-4 ${colorClass}`} fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
      </svg>
      <svg className={`w-4 h-4 ${colorClass}`} fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" />
      </svg>
    </div>
  );
};

// Function to format the created date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const PostCard = ({ post }) => {
  return (
    <div
      className={`border-2 p-4 rounded-lg shadow-lg max-w-xl min-w-[300px] ${getRiskColorClass(post.risk)}`}
    >
      <div className="flex items-center space-x-4">
        <RiskIndicator risk={post.risk} />
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          {/* Display formatted created date */}
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          <p className="text-sm text-gray-600">{post.content}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full border ${getRiskColorClass(post.risk)}`}
          >
            Risk: {post.risk}
          </span>
          <span
            className={`px-2 py-1 rounded-full ${getStatusColorClass(post.status)}`}
          >
            Status: {post.status}
          </span>
        </div>
        <div className="flex space-x-4 text-xl text-gray-500">
          {actions.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
