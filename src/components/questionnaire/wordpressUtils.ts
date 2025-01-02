import { Activity, ActivityEquipment } from './activityTypes';

export function convertEquipmentToWordPressMetaFormat(equipment: ActivityEquipment[]) {
  return equipment.map(item => ({
    name: item.name,
    description: item.description,
    estimated_cost: item.estimatedCost,
    affiliate_url: item.affiliateUrl || '',
    required: item.required
  }));
}

export function convertActivityToWordPressPost(activity: Activity) {
  return {
    title: activity.name,
    content: activity.description,
    excerpt: activity.shortDescription,
    featured_media: activity.imageUrl,
    status: 'publish',
    type: activity.wordpress?.postType || 'hobby',
    meta: {
      difficulty: activity.difficulty,
      time_commitment: activity.timeCommitment,
      cost_estimate: activity.costEstimate,
      benefits: activity.benefits,
      equipment: convertEquipmentToWordPressMetaFormat(activity.equipment),
      getting_started: activity.gettingStarted,
      activity_tags: activity.tags
    }
  };
}

export function generateWordPressCustomPostType() {
  return `
    // WordPress PHP code to register custom post type and meta fields
    function register_hobby_post_type() {
      $args = array(
        'public' => true,
        'label'  => 'Hobbies',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'hobbies'),
      );
      register_post_type('hobby', $args);
      
      // Register meta fields for equipment
      register_post_meta('hobby', 'equipment', array(
        'type' => 'array',
        'single' => true,
        'show_in_rest' => array(
          'schema' => array(
            'type' => 'array',
            'items' => array(
              'type' => 'object',
              'properties' => array(
                'name' => array('type' => 'string'),
                'description' => array('type' => 'string'),
                'estimated_cost' => array('type' => 'string'),
                'affiliate_url' => array('type' => 'string'),
                'required' => array('type' => 'boolean')
              )
            )
          )
        )
      ));
    }
    add_action('init', 'register_hobby_post_type');
  `;
}