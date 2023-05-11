import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import {
	TabPanel,
	TextControl,
	Button,
	ColorPalette,
} from "@wordpress/components";

// import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [activeTab, setActiveTab] = useState(0);

	const updateTab = (index, tabUpdates) => {
		const newTab = {
			...attributes.tabs[index],
			// mediaUrl: media.url,
			// mediaId: media.id,
			...tabUpdates,
		};
		const tabs = [...attributes.tabs];
		tabs[index] = newTab;
		setAttributes({ tabs });
	};

	const onMediaSelect = (index, media) => {
		const newTab = {
			...attributes.tabs[index],
			mediaUrl: media.url,
			mediaId: media.id,
		};
		const tabs = [...attributes.tabs];
		tabs[index] = newTab;
		setAttributes({ tabs });
	};
	const onTabMediaBodySelect = (index, media) => {
		const newTab = {
			...attributes.tabs[index],
			tabMediaUrl: media.url,
			tabMediaId: media.id,
		};
		const tabs = [...attributes.tabs];
		tabs[index] = newTab;
		setAttributes({ tabs });
	};
	const onUpdateImage = (image) => {
		setAttributes({
			mediaId: image.id,
			mediaUrl: image.url,
		});
	};
	return (
		<div {...blockProps}>
			<TabPanel
				activeClass="active-tab"
				onSelect={(selectedTabName) => {
					const selectedIndex = parseInt(selectedTabName.split("-")[1]);
					setActiveTab(selectedIndex);
				}}
				tabs={attributes.tabs.map((tab, index) => ({
					name: `tab-${index}`,
					title: tab.title || `Tab ${index + 1}`,
					className: "tab-selector",
				}))}
			>
				{(activeTabProps) => {
					const tabIndex = parseInt(activeTabProps.name.split("-")[1]);
					const tab = attributes.tabs[tabIndex];

					return (
						<>
						<p>Tab Header Image</p>
						<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => onMediaSelect(tabIndex, media)}
									allowedTypes={["image"]}
									value={tab.mediaId}
									render={({ open }) => (
										<Button onClick={open}>
											{!tab.mediaUrl
												? __("Upload Image", "textDomain")
												: __("Replace Image", "textDomain")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{tab.mediaUrl && <img src={tab.mediaUrl} alt={tab.title} />}
							<TextControl
								label={__("Tab Heading", "textDomain")}
								value={tab.title}
								onChange={(title) => updateTab(tabIndex, { ...tab, title })}
							/>
							<TextControl
								label={__("Tab Content Heading", "textDomain")}
								value={tab.content}
								onChange={(content) => updateTab(tabIndex, { ...tab, content })}
							/>
							<TextControl
								label={__("Tab Content Heading", "textDomain")}
								value={tab.contentHeading}
								onChange={(contentHeading) =>
									updateTab(tabIndex, { ...tab, contentHeading })
								}
							/>
							<hr/>
							<p>Tab Copy</p>
							<RichText
								tagName="p"
								label={__("Tab Content Body", "textDomain")}
								value={tab.contentCopy}
								placeholder={__("Enter your content here", "textDomain")}
								onChange={(contentCopy) =>
									updateTab(tabIndex, { ...tab, contentCopy })
								}
							/>
							<p>Tab Body Image</p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => onTabMediaBodySelect(tabIndex, media)}
									allowedTypes={["image"]}
									value={tab.tabMediaId}
									render={({ open }) => (
										<Button onClick={open}>
											{!tab.TabMediaUrl
												? __("Upload Image", "textDomain")
												: __("Replace Image", "textDomain")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{tab.tabMediaUrl && <img src={tab.tabMediaUrl} alt={tab.title} />}
							<hr />
							<h4>{__("Background Color", "textDomain")}</h4>
							<ColorPalette
								value={tab.backgroundColor}
								onChange={(backgroundColor) =>
									updateTab(tabIndex, { ...tab, backgroundColor })
								}
							/>
						</>
					);
				}}
			</TabPanel>
		</div>
	);
}
