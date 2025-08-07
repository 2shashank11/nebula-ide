export type Project = {
        id: string,
        user_id: string,
        name: string,
        env_label: string,
        environment: string,
        language: string,
        entry_point: string,
        description: string,
        is_starred: false,
        is_shared: false,
        last_accessed: Date,
        icon: string,
        created_at: Date,
        updated_at: Date
};