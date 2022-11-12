interface ISimpleStore {
	function getValue() external view returns (uint256);
	function setValue(uint256) external;
}