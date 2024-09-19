import React, { useState } from 'react';
import { AppstoreOutlined, CloseOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { filterState } from '../../state';

const items = [
  {
    key: 'filters',
    icon: <AppstoreOutlined />,
    label: 'Filters',
    children: [
      {
        key: 'risk',
        label: 'Risk',
        children: [
          { key: 'nightmare', label: 'Nightmare' },
          { key: 'high', label: 'High' },
          { key: 'medium', label: 'Medium' },
          { key: 'low', label: 'Low' },
        ],
      },
      {
        key: 'status',
        label: 'Status',
        children: [
          { key: 'active', label: 'Active' },
          { key: 'resolved', label: 'Resolved' },
        ],
      },
      {
        key: 'category',
        label: 'Category',
        children: [
          { key: 'category01', label: 'Category 01' },
          { key: 'category02', label: 'Category 02' },
        ],
      },
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) key[item.key] = level;
      if (item.children) func(item.children, level + 1);
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const FilterMenu = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['filters']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setfilter] = useRecoilState(filterState);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
    setIsMenuOpen(openKeys.length > 0); // Update menu open state
  };

  const onSelect = ({ key }) => {
    setSelectedKeys((prev) => [...prev, key]); // Add the selected key to the array
  };

  const onDeselect = ({ key }) => {
    setSelectedKeys((prev) => prev.filter((k) => k !== key)); // Remove the deselected key
  };

  const applyFilters = () => {
    // Update the Recoil state with selected filters
    setfilter((prevState) => ({
      ...prevState,
      risk: selectedKeys.filter((key) => ['nightmare', 'high', 'medium', 'low'].includes(key)),
      status: selectedKeys.filter((key) => ['active', 'resolved'].includes(key)),
      category: selectedKeys.filter((key) => ['category01', 'category02'].includes(key)),
    }));

    console.log('Applied Filters:', filter);

    setStateOpenKeys([]);
    setIsMenuOpen(false);
  };

  const clearFilters = () => {
    setSelectedKeys([]); 
    setfilter({ risk: [], status: [], category: [] });
    console.log('Filters cleared');
  };

  return (
    <div>
      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        onDeselect={onDeselect}
        selectedKeys={selectedKeys}
        className="w-64"
        items={items}
      />
      {/* Buttons visibility is controlled by isMenuOpen */}
      <div className={isMenuOpen ? 'block p-4' : 'hidden'}>
        <Button
          type="primary"
          onClick={applyFilters}
          className="w-sm mb-2"
        >
          Apply Filters
        </Button>
        <Button
          type="default"
          onClick={clearFilters}
          className="w-sm ml-2"
          icon={<CloseOutlined />}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterMenu;
