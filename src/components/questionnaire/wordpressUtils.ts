import { Activity } from './activityTypes';

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
      equipment: activity.equipment,
      getting_started: activity.gettingStarted,
      activity_tags: activity.tags
    }
  };
}

export function generateWordPressCustomPostType() {
  return `
    // WordPress PHP code to register custom post type
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
    }
    add_action('init', 'register_hobby_post_type');
  `;
}