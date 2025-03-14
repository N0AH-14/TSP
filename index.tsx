
	import React, { CSSProperties, PropsWithChildren } from "react";
	import styles from "./index.module.less";
	interface IProps {
		style?: CSSProperties;
	}
	
	/**
	 * @description: 01ProjectBookingWebsite
	 * @param {IProps} props
	 * @return {*}
	 * @Date: 02/10/2024, 04:23:42
	 */
	
	export default function 01ProjectBookingWebsite(props: PropsWithChildren<IProps>) {
		const { style } = props;
	
		return (
			<div className={styles.01ProjectBookingWebsiteWrap} style={style}>
				// your code
			</div>
		);
	}
	