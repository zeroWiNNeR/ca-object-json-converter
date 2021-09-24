"use strict"

const fieldTypes = {
    NONE_SELECTED: "",
    AUTO_NUMBER: "",
    FORMULA: "",
    LOOKUP: "Lookup",
    MASTER_DETAIL: "",
    EXTERNAL_LOOKUP: "",
    CHECKBOX: "",
    CURRENCY: "",
    DATE: "",
    DATE_TIME: "DateTime",
    EMAIL: "",
    GEOLOCATION: "",
    NUMBER: "Number",
    PERCENT: "",
    PHONE: "",
    PICKLIST: "",
    PICKLIST_MULTISELECT: "",
    TEXT: "Text",
    TEXTAREA: "",
    TEXTAREA_LONG: "LongTextArea",
    TEXTAREA_RICH: "",
    TEXT_ENCRYPTED: "",
    TIME: "Time",
    URL: "URL"
}

const objectFileContentConst = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">\n' +
    '    <actionOverrides>\n' +
    '        <actionName>Accept</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>CancelEdit</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>Clone</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>Delete</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>Edit</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>List</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>New</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>SaveEdit</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>Tab</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <actionOverrides>\n' +
    '        <actionName>View</actionName>\n' +
    '        <type>Default</type>\n' +
    '    </actionOverrides>\n' +
    '    <allowInChatterGroups>false</allowInChatterGroups>\n' +
    '    <compactLayoutAssignment>SYSTEM</compactLayoutAssignment>\n' +
    '    <deploymentStatus>Deployed</deploymentStatus>\n' +
    '    <enableActivities>false</enableActivities>\n' +
    '    <enableBulkApi>true</enableBulkApi>\n' +
    '    <enableFeeds>false</enableFeeds>\n' +
    '    <enableHistory>true</enableHistory>\n' +
    '    <enableReports>true</enableReports>\n' +
    '    <enableSearch>true</enableSearch>\n' +
    '    <enableSharing>true</enableSharing>\n' +
    '    <enableStreamingApi>true</enableStreamingApi>\n' +
    '    <externalSharingModel>ControlledByParent</externalSharingModel>\n' +
    '    <fields>\n' +
    '        <fullName>annotationsJson__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Annotations JSON</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>annotations__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Annotations</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>caUuid__c</fullName>\n' +
    '        <caseSensitive>false</caseSensitive>\n' +
    '        <externalId>true</externalId>\n' +
    '        <label>CloudAware UUID</label>\n' +
    '        <length>255</length>\n' +
    '        <required>true</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>true</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>clusterName__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Cluster Name</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>clusterUniqueId__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Cluster Unique ID</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>cluster__c</fullName>\n' +
    '        <deleteConstraint>SetNull</deleteConstraint>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Cluster</label>\n' +
    '        <referenceTo>CaGoogleGkeCluster__c</referenceTo>\n' +
    '        <relationshipLabel>Google GKE Cluster HPAs</relationshipLabel>\n' +
    '        <relationshipName>Google_GKE_Cluster_HPAs</relationshipName>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Lookup</type>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>creationTimestamp__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Creation Timestamp</label>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>DateTime</type>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>currentCpuUtilizationPercentage__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Current CPU Utilization Percentage</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>currentReplicas__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Current Replicas</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>deletionGracePeriodSeconds__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Deletion Grace Period Seconds</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>deletionTimestamp__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Deletion Timestamp</label>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>DateTime</type>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>desiredReplicas__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Desired Replicas</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>disappearanceTime__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Deleted From Google</label>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>DateTime</type>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>finalizersJson__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Finalizers JSON</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>finalizers__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Finalizers</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>generateName__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Generate Name</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>generation__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Generation</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>labelsJson__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Labels JSON</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>labels__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Labels</label>\n' +
    '        <length>131072</length>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>LongTextArea</type>\n' +
    '        <visibleLines>3</visibleLines>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>lastScaleTime__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Last Scale Time</label>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>DateTime</type>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>maxReplicas__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Max Replicas</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>minReplicas__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Min Replicas</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>name__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Name</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>namespace__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Namespace</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>objectDimUuid__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Object Dimension UUID</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>observableGeneration__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Observable Generation</label>\n' +
    '        <length>20</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>project__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Project</label>\n' +
    '        <referenceTo>CA10__CaGoogleProject__c</referenceTo>\n' +
    '        <relationshipName>KubernetesHPAs</relationshipName>\n' +
    '        <relationshipOrder>0</relationshipOrder>\n' +
    '        <reparentableMasterDetail>true</reparentableMasterDetail>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>MasterDetail</type>\n' +
    '        <writeRequiresMasterRead>false</writeRequiresMasterRead>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>targetCpuUtilizationPercentage__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Target CPU Utilization Percentage</label>\n' +
    '        <precision>18</precision>\n' +
    '        <required>false</required>\n' +
    '        <scale>0</scale>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Number</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <fields>\n' +
    '        <fullName>uid__c</fullName>\n' +
    '        <externalId>false</externalId>\n' +
    '        <label>Uid</label>\n' +
    '        <length>255</length>\n' +
    '        <required>false</required>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <trackTrending>false</trackTrending>\n' +
    '        <type>Text</type>\n' +
    '        <unique>false</unique>\n' +
    '    </fields>\n' +
    '    <label>Google GKE Cluster HPA</label>\n' +
    '    <nameField>\n' +
    '        <label>HPA Name</label>\n' +
    '        <trackHistory>false</trackHistory>\n' +
    '        <type>Text</type>\n' +
    '    </nameField>\n' +
    '    <pluralLabel>Google GKE Cluster HPAs</pluralLabel>\n' +
    '    <searchLayouts/>\n' +
    '    <sharingModel>ControlledByParent</sharingModel>\n' +
    '    <visibility>Public</visibility>\n' +
    '</CustomObject>\n'

const dictionaryFileContentConst = '{\n' +
    '  "name": {\n' +
    '    "explanation": "Name of Horizontal Pod Autoscaler."\n' +
    '  },\n' +
    '  "namespaceName": {\n' +
    '    "explanation": "Defines the space within which each name must be unique. An empty namespace is equivalent to the \\"default\\" namespace, but \\"default\\" is the canonical representation."\n' +
    '  },\n' +
    '  "annotations": {\n' +
    '    "explanation": "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata."\n' +
    '  },\n' +
    '  "annotationsJson": {\n' +
    '    "explanation": "Serialized annotations."\n' +
    '  },\n' +
    '  "creationTimestamp": {\n' +
    '    "explanation": "Representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations."\n' +
    '  },\n' +
    '  "deletionGracePeriodSeconds": {\n' +
    '    "explanation": "Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when Deletion Timestamp is also set."\n' +
    '  },\n' +
    '  "deletionTimestamp": {\n' +
    '    "explanation": "Date and time at which this resource will be deleted."\n' +
    '  },\n' +
    '  "finalizers": {\n' +
    '    "explanation": "Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-null, entries in this list can only be removed."\n' +
    '  },\n' +
    '  "finalizersJson": {\n' +
    '    "explanation": "Serialized. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-null, entries in this list can only be removed."\n' +
    '  },\n' +
    '  "generateName": {\n' +
    '    "explanation": "Optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. This value will also be combined with a unique suffix."\n' +
    '  },\n' +
    '  "generation": {\n' +
    '    "explanation": "If present, selects a specific revision of this object (as opposed to the latest version, the default)."\n' +
    '  },\n' +
    '  "labels": {\n' +
    '    "explanation": "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services."\n' +
    '  },\n' +
    '  "labelsJson": {\n' +
    '    "explanation": "Serialized map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services."\n' +
    '  },\n' +
    '  "namespace": {\n' +
    '    "explanation": "Defines the space within which each name must be unique. An empty namespace is equivalent to the \\"default\\" namespace, but \\"default\\" is the canonical representation."\n' +
    '  },\n' +
    '  "uid": {\n' +
    '    "explanation": "UID of the Horizontal Pod Autoscaler."\n' +
    '  },\n' +
    '  "minReplicas": {\n' +
    '    "explanation": "Lower limit for the number of replicas to which the autoscaler can scale down. It defaults to 1 pod. Allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured. Scaling is active as long as at least one metric value is available."\n' +
    '  },\n' +
    '  "maxReplicas": {\n' +
    '    "explanation": "Upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than Min Replicas."\n' +
    '  },\n' +
    '  "currentReplicas": {\n' +
    '    "explanation": "Current number of replicas of pods managed by this autoscaler."\n' +
    '  },\n' +
    '  "desiredReplicas": {\n' +
    '    "explanation": "Desired number of replicas of pods managed by this autoscaler."\n' +
    '  },\n' +
    '  "currentCpuUtilization": {\n' +
    '    "explanation": "Current average CPU utilization over all pods, represented as a percentage of requested CPU, e.g. 70 means that an average pod is using now 70% of its requested CPU."\n' +
    '  },\n' +
    '  "lastScaleTime": {\n' +
    '    "explanation": "Last time the HorizontalPodAutoscaler scaled the number of pods; used by the autoscaler to control how often the number of pods is changed."\n' +
    '  },\n' +
    '  "targetCpuUtilization": {\n' +
    '    "explanation": "Target average CPU utilization (represented as a percentage of requested CPU) over all the pods; if not specified the default autoscaling policy will be used."\n' +
    '  },\n' +
    '  "scaleTargetApiVersion": {\n' +
    '    "explanation": "API version of the Scale Target."\n' +
    '  },\n' +
    '  "scaleTargetKind": {\n' +
    '    "explanation": "Kind of the Scale Target."\n' +
    '  },\n' +
    '  "scaleTargetName": {\n' +
    '    "explanation": "Name of the Scale Target."\n' +
    '  }\n' +
    '}\n'
