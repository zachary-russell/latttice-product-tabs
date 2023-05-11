import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div class="tabs">
				{attributes.tabs.map((tab, index) => (
					<div
						key={`tab-${index}`}
						data-index={index}
						// if index = 1 give class active and style={{ backgroundColor: tab.backgroundColor }}
						style={index == 0 ? `background-color: ${tab.backgroundColor}` : ""}
						class={index === 0 ? "active" : ""}
						data-backgroundColor={tab.backgroundColor}
					>
						{tab.mediaUrl && <img src={tab.mediaUrl} alt={tab.title} />}
						<h3 class="tab-title">{tab.title}</h3>
						<p class="tab-subtitle">{tab.content}</p>
					</div>
				))}
			</div>
			<div
				class="tab-content"
				style={`background-color: ${attributes.tabs[0].backgroundColor}`}
			>
				{attributes.tabs.map((tab, index) => (
					<div key={`tab-content-${index}`} class={index === 0 ? "active" : ""}>
						<h3>{tab.contentHeading}</h3>
						<RichText.Content value={tab.contentCopy} />
						{tab.tabMediaUrl && <img src={tab.tabMediaUrl} alt={tab.title} />}
					</div>
				))}
			</div>
			<ul class="tabs-mobile">
				{attributes.tabs.map((tab, index) => (
					<li
						key={`tab-${index}`}
						data-index={index}
						// if index = 1 give class active and style={{ backgroundColor: tab.backgroundColor }}
						style={index == 0 ? `background-color: ${tab.backgroundColor}` : ""}
						class={index === 0 ? "active" : ""}
						data-backgroundColor={tab.backgroundColor}
					>
						<div class="tab-header">
							{tab.mediaUrl && <img src={tab.mediaUrl} alt={tab.title} />}
							<div class="tab-header-content">
								<h3 class="tab-title">{tab.title}</h3>
								<p class="tab-subtitle">{tab.content}</p>
							</div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
							</svg>
						</div>
						<div class="tab-body">
							<h3>{tab.contentHeading}</h3>
							<RichText.Content value={tab.contentCopy} />
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
